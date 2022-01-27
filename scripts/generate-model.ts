import {compile} from 'json-schema-to-typescript'
import {JSONSchema4} from "json-schema";
import * as path from "path";
import * as fs from "fs";
import {ResolverOptions} from "@apidevtools/json-schema-ref-parser";

const inputDir = path.join(__dirname, '..', 'json-schemas');
const outputFile = path.join(__dirname, '..', 'src', 'model', 'generated-model.ts');

(async () => {
    // Construct a "fake" object that references ALL schemas in the directory,
    // to make sure we generate all types in one output file
    // (json-schema-to-typescript doesn't support to take a _list_ of schemas)
    const files = await fs.promises.readdir(inputDir);
    const schemas = await Promise.all(files.map(async (f) => JSON.parse(await fs.promises.readFile(path.join(inputDir, f), 'utf-8'))))
    const initialValue: JSONSchema4 = {
        id: "root",
        type: "object",
        properties: {},
        additionalProperties: false
    };

    const pafSchema = schemas.reduce((accumulator: JSONSchema4, current: JSONSchema4) => {
        accumulator.properties![current.id!] = {$ref: current.id}
        return accumulator
    }, initialValue)

    // Define a custom resolver that will look "*.json" files in the same repo
    // This is required to be able to use id properties without ".json" at the end
    const resolver: ResolverOptions = {
        order: 1, // Will be executed first
        canRead: true,
        async read(file) {
            return await fs.promises.readFile(path.join(inputDir, path.basename(file.url) + '.json'), 'utf-8')
        }
    };

    const ts = await compile(pafSchema, pafSchema.id,
        {
            $refOptions: {
                resolve: {localFile: resolver}
            },
            strictIndexSignatures: true
        })

    await fs.promises.writeFile(outputFile, ts)

    console.log(`Updated: ${outputFile}`)
})()
