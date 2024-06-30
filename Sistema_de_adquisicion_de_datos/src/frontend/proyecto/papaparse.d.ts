declare module 'papaparse' {
    export interface UnparseConfig {
        quotes?: boolean | boolean[]; // default is false
        quoteChar?: string; // default is '"'
        escapeChar?: string; // default is '"'
        delimiter?: string; // default is ","
        header?: boolean; // default is true
        newline?: string; // default is "\r\n"
        skipEmptyLines?: boolean; // default is false
        columns?: string[] | null; // default is null
      }
    
      export function unparse(data: any[], options?: UnparseConfig): string;
}