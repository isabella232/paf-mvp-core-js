import {compile} from 'json-schema-to-typescript'
import {JSONSchema4} from "json-schema";
import * as path from "path";
import * as fs from "fs";
import {ResolverOptions} from "@apidevtools/json-schema-ref-parser";

if (!(process.argv[2]?.length > 0)) {
    throw `Usage: generate-model-from-schemas.ts <inputDir>\nExample: generate-model-from-schemas.ts ../../addressable-network-proposals/mvp-spec/json-schemas`
}

const inputDir = path.join(process.cwd(), process.argv[2]);

if (!fs.existsSync(inputDir)) {
    throw `Input dir not found: "${inputDir}"`
}

const outputFile = path.join(__dirname, '..', 'src', 'model', 'generated-model.ts');

(async () => {
    // Construct a "fake" object that references ALL schemas in the directory,
    // to make sure we generate all types in one output file
    // (json-schema-to-typescript doesn't support to take a _list_ of schemas)
    const files = await fs.promises.readdir(inputDir);
    const schemas = await Promise.all(files.map(async (f) => JSON.parse(await fs.promises.readFile(path.join(inputDir, f), 'utf-8'))))
    const initialValue: JSONSchema4 = {
        id: "root",
        title: '_',
        type: "object",
        properties: {},
        additionalProperties: false,
        description: '** Please ignore **\nOnly needed to have an entry point for generating all interfaces together'
    };

    const rootSchema = schemas.reduce((accumulator: JSONSchema4, current: JSONSchema4) => {
        accumulator.properties![current.$id!] = {$ref: `${current.$id}.json`}
        return accumulator
    }, initialValue)

    const schemaStore = schemas.reduce((accumulator: JSONSchema4, current: JSONSchema4) => {
        // Automatically add an "id" field that seems to be needed to get a consistent data model
        // and remove the title attribute that is used to generate class names (not convenient)
        const {title, description, ...rest} = current;
        accumulator[`${current.$id}.json`] = {
            ...rest,
            // If no description was provided, use the title instead (useful for comments)
            description: description ?? title,
            id: current.$id
        }
        return accumulator
    }, {})

    // Define a custom resolver that will look "*.json" files in the same repo
    // This is required to be able to use id properties without ".json" at the end
    const resolver: ResolverOptions = {
        order: 1, // Will be executed first
        canRead: true,
        read(file) {
            return JSON.stringify(schemaStore[path.basename(file.url)])
        }
    };

    const ts = await compile(rootSchema, rootSchema.id,
        {
            $refOptions: {
                resolve: {localFile: resolver}
            },
            strictIndexSignatures: true
        })

    await fs.promises.writeFile(outputFile, ts)

    console.log(`Updated: ${outputFile}`)
})()
