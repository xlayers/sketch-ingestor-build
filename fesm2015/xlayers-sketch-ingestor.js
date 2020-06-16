import { __awaiter } from 'tslib';
import { Injectable, ɵɵdefineInjectable, NgModule } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const entryAsyncCheck = (/**
 * @param {?} entry
 * @return {?}
 */
(entry) => {
    return !!entry && typeof entry === 'object' && 'async' in entry;
});
const ɵ0 = entryAsyncCheck;
/** @type {?} */
const jszipLoadAsync = (/**
 * @param {?} jszip
 * @return {?}
 */
(jszip) => {
    return !!jszip && typeof jszip === 'object' && 'loadAsync' in jszip;
});
const ɵ1 = jszipLoadAsync;
class SketchIngestorService {
    /**
     * @param {?} file
     * @return {?}
     */
    process(file) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const data = (/** @type {?} */ ({
                images: {},
                pages: [],
                previews: [],
                document: {},
                user: {},
                meta: {}
            }));
            /** @type {?} */
            const files = yield this.readZipEntries(file);
            yield Promise.all(Object.entries(files).map((/**
             * @param {?} __0
             * @return {?}
             */
            ([relativePath, entry]) => __awaiter(this, void 0, void 0, function* () {
                if (relativePath === 'previews/preview.png') {
                    return this.addPreviewImage(data, relativePath, entry);
                }
                else if (relativePath.startsWith('images/')) {
                    return this.addImage(data, relativePath, entry);
                }
                else if (relativePath.startsWith('pages/')) {
                    return this.addPage(data, relativePath, entry);
                }
                else {
                    /** @type {?} */
                    const objectName = relativePath.replace('.json', '');
                    if (data.hasOwnProperty(objectName)) {
                        return this.addConfiguration(data, objectName, entry);
                    }
                }
                return Promise.resolve({});
            }))));
            return data;
        });
    }
    /**
     * @private
     * @param {?} file
     * @return {?}
     */
    readZipEntries(file) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            (resolve, reject) => {
                /** @type {?} */
                const fileReader = new FileReader();
                fileReader.onload = (/**
                 * @param {?} _event
                 * @return {?}
                 */
                _event => {
                    try {
                        resolve(this.unzipSketchPackage(fileReader.result));
                    }
                    catch (e) {
                        reject(e);
                    }
                });
                fileReader.onerror = (/**
                 * @param {?} e
                 * @return {?}
                 */
                e => {
                    reject(e);
                });
                try {
                    fileReader.readAsArrayBuffer(file);
                }
                catch (e) {
                    reject(e);
                }
            }));
        });
    }
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    unzipSketchPackage(data) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const jszip = window['JSZip']();
            if (jszipLoadAsync(jszip)) {
                /** @type {?} */
                const zipFileInstance = yield jszip.loadAsync(data);
                /** @type {?} */
                const files = [];
                zipFileInstance.forEach((/**
                 * @param {?} relativePath
                 * @param {?} zipEntry
                 * @return {?}
                 */
                (relativePath, zipEntry) => {
                    files[relativePath] = zipEntry;
                }));
                return files;
            }
            else {
                throw new Error('JSzip not loaded');
            }
        });
    }
    /**
     * @private
     * @param {?} data
     * @param {?} relativePath
     * @param {?} entry
     * @return {?}
     */
    addConfiguration(data, relativePath, entry) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const content = yield this.extractJson(relativePath, entry);
            data[relativePath] = content;
        });
    }
    /**
     * @private
     * @param {?} data
     * @param {?} relativePath
     * @param {?} entry
     * @return {?}
     */
    addPage(data, relativePath, entry) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                /** @type {?} */
                const content = yield this.extractJson(relativePath, entry);
                data.pages.push(content);
            }
            catch (e) {
                throw new Error(`Could not load page "${relativePath}"`);
            }
        });
    }
    /**
     * @private
     * @param {?} data
     * @param {?} relativePath
     * @param {?} entry
     * @return {?}
     */
    addImage(data, relativePath, entry) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const imageData = yield this.extractBase64(relativePath, entry);
            ((/** @type {?} */ (data))).images[relativePath] = imageData;
        });
    }
    /**
     * @private
     * @param {?} data
     * @param {?} relativePath
     * @param {?} entry
     * @return {?}
     */
    addPreviewImage(data, relativePath, entry) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const imageData = yield this.extractBase64(relativePath, entry);
            data.previews.push(imageData);
        });
    }
    /**
     * @private
     * @param {?} _relativePath
     * @param {?} entry
     * @return {?}
     */
    extractJson(_relativePath, entry) {
        return __awaiter(this, void 0, void 0, function* () {
            if (entryAsyncCheck(entry)) {
                /** @type {?} */
                const content = yield entry.async('string');
                return JSON.parse(content);
            }
            else {
                throw new Error('JSZip undefined async function');
            }
        });
    }
    /**
     * @private
     * @param {?} relativePath
     * @param {?} entry
     * @return {?}
     */
    extractBase64(relativePath, entry) {
        return __awaiter(this, void 0, void 0, function* () {
            if (entryAsyncCheck(entry)) {
                return entry.async('base64');
            }
            else {
                throw new Error('JSZip undefined async function');
            }
        });
    }
}
SketchIngestorService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */ SketchIngestorService.ngInjectableDef = ɵɵdefineInjectable({ factory: function SketchIngestorService_Factory() { return new SketchIngestorService(); }, token: SketchIngestorService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SketchIngestorModule {
}
SketchIngestorModule.decorators = [
    { type: NgModule }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { SketchIngestorModule, SketchIngestorService };
//# sourceMappingURL=xlayers-sketch-ingestor.js.map
