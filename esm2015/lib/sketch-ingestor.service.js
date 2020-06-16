/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
export class SketchIngestorService {
    /**
     * @param {?} file
     * @return {?}
     */
    process(file) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
            ([relativePath, entry]) => tslib_1.__awaiter(this, void 0, void 0, function* () {
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
/** @nocollapse */ SketchIngestorService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function SketchIngestorService_Factory() { return new SketchIngestorService(); }, token: SketchIngestorService, providedIn: "root" });
export { ɵ0, ɵ1 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tldGNoLWluZ2VzdG9yLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AeGxheWVycy9za2V0Y2gtaW5nZXN0b3IvIiwic291cmNlcyI6WyJsaWIvc2tldGNoLWluZ2VzdG9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7TUFFckMsZUFBZTs7OztBQUFHLENBQUMsS0FBVSxFQUFnQyxFQUFFO0lBQ25FLE9BQU8sQ0FBQyxDQUFDLEtBQUssSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksT0FBTyxJQUFJLEtBQUssQ0FBQztBQUNsRSxDQUFDLENBQUE7OztNQUVLLGNBQWM7Ozs7QUFBRyxDQUFDLEtBQVUsRUFBb0MsRUFBRTtJQUN0RSxPQUFPLENBQUMsQ0FBQyxLQUFLLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLFdBQVcsSUFBSSxLQUFLLENBQUM7QUFDdEUsQ0FBQyxDQUFBOztBQUtELE1BQU0sT0FBTyxxQkFBcUI7Ozs7O0lBQzFCLE9BQU8sQ0FBQyxJQUFVOzs7a0JBQ2hCLElBQUksR0FBRyxtQkFBQTtnQkFDWCxNQUFNLEVBQUUsRUFBRTtnQkFDVixLQUFLLEVBQUUsRUFBRTtnQkFDVCxRQUFRLEVBQUUsRUFBRTtnQkFDWixRQUFRLEVBQUUsRUFBRTtnQkFDWixJQUFJLEVBQUUsRUFBRTtnQkFDUixJQUFJLEVBQUUsRUFBRTthQUNULEVBQU87O2tCQUVGLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDO1lBRTdDLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FDZixNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUc7Ozs7WUFBQyxDQUFPLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUU7Z0JBQ3hELElBQUksWUFBWSxLQUFLLHNCQUFzQixFQUFFO29CQUMzQyxPQUFP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QUMsWUFBb0IsRUFBRSxLQUFjOztZQUM5RCxJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDMUIsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzlCO2lCQUFNO2dCQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQzthQUNuRDtRQUNILENBQUM7S0FBQTs7O1lBcElGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmNvbnN0IGVudHJ5QXN5bmNDaGVjayA9IChlbnRyeTogYW55KTogZW50cnkgaXMgeyBhc3luYzogRnVuY3Rpb24gfSA9PiB7XHJcbiAgcmV0dXJuICEhZW50cnkgJiYgdHlwZW9mIGVudHJ5ID09PSAnb2JqZWN0JyAmJiAnYXN5bmMnIGluIGVudHJ5O1xyXG59O1xyXG5cclxuY29uc3QganN6aXBMb2FkQXN5bmMgPSAoanN6aXA6IGFueSk6IGpzemlwIGlzIHsgbG9hZEFzeW5jOiBGdW5jdGlvbiB9ID0+IHtcclxuICByZXR1cm4gISFqc3ppcCAmJiB0eXBlb2YganN6aXAgPT09ICdvYmplY3QnICYmICdsb2FkQXN5bmMnIGluIGpzemlwO1xyXG59O1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgU2tldGNoSW5nZXN0b3JTZXJ2aWNlIHtcclxuICBhc3luYyBwcm9jZXNzKGZpbGU6IEZpbGUpIHtcclxuICAgIGNvbnN0IGRhdGEgPSB7XHJcbiAgICAgIGltYWdlczoge30sXHJcbiAgICAgIHBhZ2VzOiBbXSxcclxuICAgICAgcHJldmlld3M6IFtdLFxyXG4gICAgICBkb2N1bWVudDoge30sXHJcbiAgICAgIHVzZXI6IHt9LFxyXG4gICAgICBtZXRhOiB7fVxyXG4gICAgfSBhcyBhbnk7XHJcblxyXG4gICAgY29uc3QgZmlsZXMgPSBhd2FpdCB0aGlzLnJlYWRaaXBFbnRyaWVzKGZpbGUpO1xyXG5cclxuICAgIGF3YWl0IFByb21pc2UuYWxsKFxyXG4gICAgICBPYmplY3QuZW50cmllcyhmaWxlcykubWFwKGFzeW5jIChbcmVsYXRpdmVQYXRoLCBlbnRyeV0pID0+IHtcclxuICAgICAgICBpZiAocmVsYXRpdmVQYXRoID09PSAncHJldmlld3MvcHJldmlldy5wbmcnKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5hZGRQcmV2aWV3SW1hZ2UoZGF0YSwgcmVsYXRpdmVQYXRoLCBlbnRyeSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChyZWxhdGl2ZVBhdGguc3RhcnRzV2l0aCgnaW1hZ2VzLycpKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5hZGRJbWFnZShkYXRhLCByZWxhdGl2ZVBhdGgsIGVudHJ5KTtcclxuICAgICAgICB9IGVsc2UgaWYgKHJlbGF0aXZlUGF0aC5zdGFydHNXaXRoKCdwYWdlcy8nKSkge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuYWRkUGFnZShkYXRhLCByZWxhdGl2ZVBhdGgsIGVudHJ5KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc3Qgb2JqZWN0TmFtZSA9IHJlbGF0aXZlUGF0aC5yZXBsYWNlKCcuanNvbicsICcnKTtcclxuICAgICAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KG9iamVjdE5hbWUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFkZENvbmZpZ3VyYXRpb24oZGF0YSwgb2JqZWN0TmFtZSwgZW50cnkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHt9KTtcclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIGRhdGE7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIHJlYWRaaXBFbnRyaWVzKGZpbGU6IEJsb2IpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTx1bmtub3duW10+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgY29uc3QgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcblxyXG4gICAgICBmaWxlUmVhZGVyLm9ubG9hZCA9IF9ldmVudCA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIHJlc29sdmUodGhpcy51bnppcFNrZXRjaFBhY2thZ2UoZmlsZVJlYWRlci5yZXN1bHQpKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICByZWplY3QoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgZmlsZVJlYWRlci5vbmVycm9yID0gZSA9PiB7XHJcbiAgICAgICAgcmVqZWN0KGUpO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgdHJ5IHtcclxuICAgICAgICBmaWxlUmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGZpbGUpO1xyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgcmVqZWN0KGUpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgdW56aXBTa2V0Y2hQYWNrYWdlKGRhdGE6IHN0cmluZyB8IEFycmF5QnVmZmVyKSB7XHJcbiAgICBjb25zdCBqc3ppcCA9IHdpbmRvd1snSlNaaXAnXSgpO1xyXG5cclxuICAgIGlmIChqc3ppcExvYWRBc3luYyhqc3ppcCkpIHtcclxuICAgICAgY29uc3QgemlwRmlsZUluc3RhbmNlID0gYXdhaXQganN6aXAubG9hZEFzeW5jKGRhdGEpO1xyXG5cclxuICAgICAgY29uc3QgZmlsZXM6IHVua25vd25bXSA9IFtdO1xyXG4gICAgICB6aXBGaWxlSW5zdGFuY2UuZm9yRWFjaCgocmVsYXRpdmVQYXRoLCB6aXBFbnRyeSkgPT4ge1xyXG4gICAgICAgIGZpbGVzW3JlbGF0aXZlUGF0aF0gPSB6aXBFbnRyeTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBmaWxlcztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignSlN6aXAgbm90IGxvYWRlZCcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBhZGRDb25maWd1cmF0aW9uKFxyXG4gICAgZGF0YTogU2tldGNoTVNEYXRhLFxyXG4gICAgcmVsYXRpdmVQYXRoOiBzdHJpbmcsXHJcbiAgICBlbnRyeTogdW5rbm93blxyXG4gICkge1xyXG4gICAgY29uc3QgY29udGVudCA9IGF3YWl0IHRoaXMuZXh0cmFjdEpzb24ocmVsYXRpdmVQYXRoLCBlbnRyeSk7XHJcbiAgICBkYXRhW3JlbGF0aXZlUGF0aF0gPSBjb250ZW50O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBhZGRQYWdlKFxyXG4gICAgZGF0YTogU2tldGNoTVNEYXRhLFxyXG4gICAgcmVsYXRpdmVQYXRoOiBzdHJpbmcsXHJcbiAgICBlbnRyeTogdW5rbm93blxyXG4gICkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IHRoaXMuZXh0cmFjdEpzb24ocmVsYXRpdmVQYXRoLCBlbnRyeSk7XHJcbiAgICAgIGRhdGEucGFnZXMucHVzaChjb250ZW50KTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgbG9hZCBwYWdlIFwiJHtyZWxhdGl2ZVBhdGh9XCJgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgYWRkSW1hZ2UoXHJcbiAgICBkYXRhOiBTa2V0Y2hNU0RhdGEsXHJcbiAgICByZWxhdGl2ZVBhdGg6IHN0cmluZyxcclxuICAgIGVudHJ5OiB1bmtub3duXHJcbiAgKSB7XHJcbiAgICBjb25zdCBpbWFnZURhdGEgPSBhd2FpdCB0aGlzLmV4dHJhY3RCYXNlNjQocmVsYXRpdmVQYXRoLCBlbnRyeSk7XHJcbiAgICAoZGF0YSBhcyBhbnkpLmltYWdlc1tyZWxhdGl2ZVBhdGhdID0gaW1hZ2VEYXRhO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBhZGRQcmV2aWV3SW1hZ2UoXHJcbiAgICBkYXRhOiBTa2V0Y2hNU0RhdGEsXHJcbiAgICByZWxhdGl2ZVBhdGg6IHN0cmluZyxcclxuICAgIGVudHJ5OiB1bmtub3duXHJcbiAgKSB7XHJcbiAgICBjb25zdCBpbWFnZURhdGEgPSBhd2FpdCB0aGlzLmV4dHJhY3RCYXNlNjQocmVsYXRpdmVQYXRoLCBlbnRyeSk7XHJcbiAgICBkYXRhLnByZXZpZXdzLnB1c2goaW1hZ2VEYXRhKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgZXh0cmFjdEpzb24oX3JlbGF0aXZlUGF0aDogc3RyaW5nLCBlbnRyeTogdW5rbm93bikge1xyXG4gICAgaWYgKGVudHJ5QXN5bmNDaGVjayhlbnRyeSkpIHtcclxuICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IGVudHJ5LmFzeW5jKCdzdHJpbmcnKTtcclxuICAgICAgcmV0dXJuIEpTT04ucGFyc2UoY29udGVudCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0pTWmlwIHVuZGVmaW5lZCBhc3luYyBmdW5jdGlvbicpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBleHRyYWN0QmFzZTY0KHJlbGF0aXZlUGF0aDogc3RyaW5nLCBlbnRyeTogdW5rbm93bikge1xyXG4gICAgaWYgKGVudHJ5QXN5bmNDaGVjayhlbnRyeSkpIHtcclxuICAgICAgcmV0dXJuIGVudHJ5LmFzeW5jKCdiYXNlNjQnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignSlNaaXAgdW5kZWZpbmVkIGFzeW5jIGZ1bmN0aW9uJyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==