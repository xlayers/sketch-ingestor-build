export declare class SketchIngestorService {
    process(file: File): Promise<any>;
    private readZipEntries;
    private unzipSketchPackage;
    private addConfiguration;
    private addPage;
    private addImage;
    private addPreviewImage;
    private extractJson;
    private extractBase64;
}
