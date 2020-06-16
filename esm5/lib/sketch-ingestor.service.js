/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/** @type {?} */
var entryAsyncCheck = (/**
 * @param {?} entry
 * @return {?}
 */
function (entry) {
    return !!entry && typeof entry === 'object' && 'async' in entry;
});
var ɵ0 = entryAsyncCheck;
/** @type {?} */
var jszipLoadAsync = (/**
 * @param {?} jszip
 * @return {?}
 */
function (jszip) {
    return !!jszip && typeof jszip === 'object' && 'loadAsync' in jszip;
});
var ɵ1 = jszipLoadAsync;
var SketchIngestorService = /** @class */ (function () {
    function SketchIngestorService() {
    }
    /**
     * @param {?} file
     * @return {?}
     */
    SketchIngestorService.prototype.process = /**
     * @param {?} file
     * @return {?}
     */
    function (file) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var data, files;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = (/** @type {?} */ ({
                            images: {},
                            pages: [],
                            previews: [],
                            document: {},
                            user: {},
                            meta: {}
                        }));
                        return [4 /*yield*/, this.readZipEntries(file)];
                    case 1:
                        files = _a.sent();
                        return [4 /*yield*/, Promise.all(Object.entries(files).map((/**
                             * @param {?} __0
                             * @return {?}
                             */
                            function (_a) {
                                var _b = tslib_1.__read(_a, 2), relativePath = _b[0], entry = _b[1];
                                return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                    var objectName;
                                    return tslib_1.__generator(this, function (_c) {
                                        if (relativePath === 'previews/preview.png') {
                                            return [2 /*return*/, this.addPreviewImage(data, relativePath, entry)];
                                        }
                                        else if (relativePath.startsWith('images/')) {
                                            return [2 /*return*/, this.addImage(data, relativePath, entry)];
                                        }
                                        else if (relativePath.startsWith('pages/')) {
                                            return [2 /*return*/, this.addPage(data, relativePath, entry)];
                                        }
                                        else {
                                            objectName = relativePath.replace('.json', '');
                                            if (data.hasOwnProperty(objectName)) {
                                                return [2 /*return*/, this.addConfiguration(data, objectName, entry)];
                                            }
                                        }
                                        return [2 /*return*/, Promise.resolve({})];
                                    });
                                });
                            })))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * @private
     * @param {?} file
     * @return {?}
     */
    SketchIngestorService.prototype.readZipEntries = /**
     * @private
     * @param {?} file
     * @return {?}
     */
    function (file) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, new Promise((/**
                     * @param {?} resolve
                     * @param {?} reject
                     * @return {?}
                     */
                    function (resolve, reject) {
                        /** @type {?} */
                        var fileReader = new FileReader();
                        fileReader.onload = (/**
                         * @param {?} _event
                         * @return {?}
                         */
                        function (_event) {
                            try {
                                resolve(_this.unzipSketchPackage(fileReader.result));
                            }
                            catch (e) {
                                reject(e);
                            }
                        });
                        fileReader.onerror = (/**
                         * @param {?} e
                         * @return {?}
                         */
                        function (e) {
                            reject(e);
                        });
                        try {
                            fileReader.readAsArrayBuffer(file);
                        }
                        catch (e) {
                            reject(e);
                        }
                    }))];
            });
        });
    };
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    SketchIngestorService.prototype.unzipSketchPackage = /**
     * @private
     * @param {?} data
     * @return {?}
     */
    function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var jszip, zipFileInstance, files_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jszip = window['JSZip']();
                        if (!jszipLoadAsync(jszip)) return [3 /*break*/, 2];
                        return [4 /*yield*/, jszip.loadAsync(data)];
                    case 1:
                        zipFileInstance = _a.sent();
                        files_1 = [];
                        zipFileInstance.forEach((/**
                         * @param {?} relativePath
                         * @param {?} zipEntry
                         * @return {?}
                         */
                        function (relativePath, zipEntry) {
                            files_1[relativePath] = zipEntry;
                        }));
                        return [2 /*return*/, files_1];
                    case 2: throw new Error('JSzip not loaded');
                }
            });
        });
    };
    /**
     * @private
     * @param {?} data
     * @param {?} relativePath
     * @param {?} entry
     * @return {?}
     */
    SketchIngestorService.prototype.addConfiguration = /**
     * @private
     * @param {?} data
     * @param {?} relativePath
     * @param {?} entry
     * @return {?}
     */
    function (data, relativePath, entry) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var content;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.extractJson(relativePath, entry)];
                    case 1:
                        content = _a.sent();
                        data[relativePath] = content;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @private
     * @param {?} data
     * @param {?} relativePath
     * @param {?} entry
     * @return {?}
     */
    SketchIngestorService.prototype.addPage = /**
     * @private
     * @param {?} data
     * @param {?} relativePath
     * @param {?} entry
     * @return {?}
     */
    function (data, relativePath, entry) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var content, e_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.extractJson(relativePath, entry)];
                    case 1:
                        content = _a.sent();
                        data.pages.push(content);
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        throw new Error("Could not load page \"" + relativePath + "\"");
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @private
     * @param {?} data
     * @param {?} relativePath
     * @param {?} entry
     * @return {?}
     */
    SketchIngestorService.prototype.addImage = /**
     * @private
     * @param {?} data
     * @param {?} relativePath
     * @param {?} entry
     * @return {?}
     */
    function (data, relativePath, entry) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var imageData;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.extractBase64(relativePath, entry)];
                    case 1:
                        imageData = _a.sent();
                        ((/** @type {?} */ (data))).images[relativePath] = imageData;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @private
     * @param {?} data
     * @param {?} relativePath
     * @param {?} entry
     * @return {?}
     */
    SketchIngestorService.prototype.addPreviewImage = /**
     * @private
     * @param {?} data
     * @param {?} relativePath
     * @param {?} entry
     * @return {?}
     */
    function (data, relativePath, entry) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var imageData;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.extractBase64(relativePath, entry)];
                    case 1:
                        imageData = _a.sent();
                        data.previews.push(imageData);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @private
     * @param {?} _relativePath
     * @param {?} entry
     * @return {?}
     */
    SketchIngestorService.prototype.extractJson = /**
     * @private
     * @param {?} _relativePath
     * @param {?} entry
     * @return {?}
     */
    function (_relativePath, entry) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var content;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!entryAsyncCheck(entry)) return [3 /*break*/, 2];
                        return [4 /*yield*/, entry.async('string')];
                    case 1:
                        content = _a.sent();
                        return [2 /*return*/, JSON.parse(content)];
                    case 2: throw new Error('JSZip undefined async function');
                }
            });
        });
    };
    /**
     * @private
     * @param {?} relativePath
     * @param {?} entry
     * @return {?}
     */
    SketchIngestorService.prototype.extractBase64 = /**
     * @private
     * @param {?} relativePath
     * @param {?} entry
     * @return {?}
     */
    function (relativePath, entry) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (entryAsyncCheck(entry)) {
                    return [2 /*return*/, entry.async('base64')];
                }
                else {
                    throw new Error('JSZip undefined async function');
                }
                return [2 /*return*/];
            });
        });
    };
    SketchIngestorService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */ SketchIngestorService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function SketchIngestorService_Factory() { return new SketchIngestorService(); }, token: SketchIngestorService, providedIn: "root" });
    return SketchIngestorService;
}());
export { SketchIngestorService };
export { ɵ0, ɵ1 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tldGNoLWluZ2VzdG9yLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AeGxheWVycy9za2V0Y2gtaW5nZXN0b3IvIiwic291cmNlcyI6WyJsaWIvc2tldGNoLWluZ2VzdG9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7SUFFckMsZUFBZTs7OztBQUFHLFVBQUMsS0FBVTtJQUNqQyxPQUFPLENBQUMsQ0FBQyxLQUFLLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLE9BQU8sSUFBSSxLQUFLLENBQUM7QUFDbEUsQ0FBQyxDQUFBOzs7SUFFSyxjQUFjOzs7O0FBQUcsVUFBQyxLQUFVO0lBQ2hDLE9BQU8sQ0FBQyxDQUFDLEtBQUssSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksV0FBVyxJQUFJLEtBQUssQ0FBQztBQUN0RSxDQUFDLENBQUE7O0FBRUQ7SUFBQTtLQXFJQzs7Ozs7SUFqSU8sdUNBQU87Ozs7SUFBYixVQUFjLElBQVU7Ozs7Ozs7d0JBQ2hCLElBQUksR0FBRyxtQkFBQTs0QkFDWCxNQUFNLEVBQUUsRUFBRTs0QkFDVixLQUFLLEVBQUUsRUFBRTs0QkFDVCxRQUFRLEVBQUUsRUFBRTs0QkFDWixRQUFRLEVBQUUsRUFBRTs0QkFDWixJQUFJLEVBQUUsRUFBRTs0QkFDUixJQUFJLEVBQUUsRUFBRTt5QkFDVCxFQUFPO3dCQUVNLHFCQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUE7O3dCQUF2QyxLQUFLLEdBQUcsU0FBK0I7d0JBRTdDLHFCQUFNLE9BQU8sQ0FBQyxHQUFHLENBQ2YsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHOzs7OzRCQUFDLFVBQU8sRUFBcUI7b0NBQXJCLDBCQUFxQixFQUFwQixvQkFBWSxFQUFFLGFBQUs7Ozs7d0NBQ25ELElBQUksWUFBWSxLQUFLLHNCQUFz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QyxzQkFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFDOzRCQUUzQixNQUFNLElBQUksS0FBSyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7Ozs7S0FFckQ7Ozs7Ozs7SUFFYSw2Q0FBYTs7Ozs7O0lBQTNCLFVBQTRCLFlBQW9CLEVBQUUsS0FBYzs7O2dCQUM5RCxJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDMUIsc0JBQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBQztpQkFDOUI7cUJBQU07b0JBQ0wsTUFBTSxJQUFJLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO2lCQUNuRDs7OztLQUNGOztnQkFwSUYsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7O2dDQVpEO0NBK0lDLEFBcklELElBcUlDO1NBbElZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmNvbnN0IGVudHJ5QXN5bmNDaGVjayA9IChlbnRyeTogYW55KTogZW50cnkgaXMgeyBhc3luYzogRnVuY3Rpb24gfSA9PiB7XHJcbiAgcmV0dXJuICEhZW50cnkgJiYgdHlwZW9mIGVudHJ5ID09PSAnb2JqZWN0JyAmJiAnYXN5bmMnIGluIGVudHJ5O1xyXG59O1xyXG5cclxuY29uc3QganN6aXBMb2FkQXN5bmMgPSAoanN6aXA6IGFueSk6IGpzemlwIGlzIHsgbG9hZEFzeW5jOiBGdW5jdGlvbiB9ID0+IHtcclxuICByZXR1cm4gISFqc3ppcCAmJiB0eXBlb2YganN6aXAgPT09ICdvYmplY3QnICYmICdsb2FkQXN5bmMnIGluIGpzemlwO1xyXG59O1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgU2tldGNoSW5nZXN0b3JTZXJ2aWNlIHtcclxuICBhc3luYyBwcm9jZXNzKGZpbGU6IEZpbGUpIHtcclxuICAgIGNvbnN0IGRhdGEgPSB7XHJcbiAgICAgIGltYWdlczoge30sXHJcbiAgICAgIHBhZ2VzOiBbXSxcclxuICAgICAgcHJldmlld3M6IFtdLFxyXG4gICAgICBkb2N1bWVudDoge30sXHJcbiAgICAgIHVzZXI6IHt9LFxyXG4gICAgICBtZXRhOiB7fVxyXG4gICAgfSBhcyBhbnk7XHJcblxyXG4gICAgY29uc3QgZmlsZXMgPSBhd2FpdCB0aGlzLnJlYWRaaXBFbnRyaWVzKGZpbGUpO1xyXG5cclxuICAgIGF3YWl0IFByb21pc2UuYWxsKFxyXG4gICAgICBPYmplY3QuZW50cmllcyhmaWxlcykubWFwKGFzeW5jIChbcmVsYXRpdmVQYXRoLCBlbnRyeV0pID0+IHtcclxuICAgICAgICBpZiAocmVsYXRpdmVQYXRoID09PSAncHJldmlld3MvcHJldmlldy5wbmcnKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5hZGRQcmV2aWV3SW1hZ2UoZGF0YSwgcmVsYXRpdmVQYXRoLCBlbnRyeSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChyZWxhdGl2ZVBhdGguc3RhcnRzV2l0aCgnaW1hZ2VzLycpKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5hZGRJbWFnZShkYXRhLCByZWxhdGl2ZVBhdGgsIGVudHJ5KTtcclxuICAgICAgICB9IGVsc2UgaWYgKHJlbGF0aXZlUGF0aC5zdGFydHNXaXRoKCdwYWdlcy8nKSkge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuYWRkUGFnZShkYXRhLCByZWxhdGl2ZVBhdGgsIGVudHJ5KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc3Qgb2JqZWN0TmFtZSA9IHJlbGF0aXZlUGF0aC5yZXBsYWNlKCcuanNvbicsICcnKTtcclxuICAgICAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KG9iamVjdE5hbWUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFkZENvbmZpZ3VyYXRpb24oZGF0YSwgb2JqZWN0TmFtZSwgZW50cnkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHt9KTtcclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIGRhdGE7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIHJlYWRaaXBFbnRyaWVzKGZpbGU6IEJsb2IpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTx1bmtub3duW10+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgY29uc3QgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcblxyXG4gICAgICBmaWxlUmVhZGVyLm9ubG9hZCA9IF9ldmVudCA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIHJlc29sdmUodGhpcy51bnppcFNrZXRjaFBhY2thZ2UoZmlsZVJlYWRlci5yZXN1bHQpKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICByZWplY3QoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgZmlsZVJlYWRlci5vbmVycm9yID0gZSA9PiB7XHJcbiAgICAgICAgcmVqZWN0KGUpO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgdHJ5IHtcclxuICAgICAgICBmaWxlUmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGZpbGUpO1xyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgcmVqZWN0KGUpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgdW56aXBTa2V0Y2hQYWNrYWdlKGRhdGE6IHN0cmluZyB8IEFycmF5QnVmZmVyKSB7XHJcbiAgICBjb25zdCBqc3ppcCA9IHdpbmRvd1snSlNaaXAnXSgpO1xyXG5cclxuICAgIGlmIChqc3ppcExvYWRBc3luYyhqc3ppcCkpIHtcclxuICAgICAgY29uc3QgemlwRmlsZUluc3RhbmNlID0gYXdhaXQganN6aXAubG9hZEFzeW5jKGRhdGEpO1xyXG5cclxuICAgICAgY29uc3QgZmlsZXM6IHVua25vd25bXSA9IFtdO1xyXG4gICAgICB6aXBGaWxlSW5zdGFuY2UuZm9yRWFjaCgocmVsYXRpdmVQYXRoLCB6aXBFbnRyeSkgPT4ge1xyXG4gICAgICAgIGZpbGVzW3JlbGF0aXZlUGF0aF0gPSB6aXBFbnRyeTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBmaWxlcztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignSlN6aXAgbm90IGxvYWRlZCcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBhZGRDb25maWd1cmF0aW9uKFxyXG4gICAgZGF0YTogU2tldGNoTVNEYXRhLFxyXG4gICAgcmVsYXRpdmVQYXRoOiBzdHJpbmcsXHJcbiAgICBlbnRyeTogdW5rbm93blxyXG4gICkge1xyXG4gICAgY29uc3QgY29udGVudCA9IGF3YWl0IHRoaXMuZXh0cmFjdEpzb24ocmVsYXRpdmVQYXRoLCBlbnRyeSk7XHJcbiAgICBkYXRhW3JlbGF0aXZlUGF0aF0gPSBjb250ZW50O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBhZGRQYWdlKFxyXG4gICAgZGF0YTogU2tldGNoTVNEYXRhLFxyXG4gICAgcmVsYXRpdmVQYXRoOiBzdHJpbmcsXHJcbiAgICBlbnRyeTogdW5rbm93blxyXG4gICkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IHRoaXMuZXh0cmFjdEpzb24ocmVsYXRpdmVQYXRoLCBlbnRyeSk7XHJcbiAgICAgIGRhdGEucGFnZXMucHVzaChjb250ZW50KTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgbG9hZCBwYWdlIFwiJHtyZWxhdGl2ZVBhdGh9XCJgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgYWRkSW1hZ2UoXHJcbiAgICBkYXRhOiBTa2V0Y2hNU0RhdGEsXHJcbiAgICByZWxhdGl2ZVBhdGg6IHN0cmluZyxcclxuICAgIGVudHJ5OiB1bmtub3duXHJcbiAgKSB7XHJcbiAgICBjb25zdCBpbWFnZURhdGEgPSBhd2FpdCB0aGlzLmV4dHJhY3RCYXNlNjQocmVsYXRpdmVQYXRoLCBlbnRyeSk7XHJcbiAgICAoZGF0YSBhcyBhbnkpLmltYWdlc1tyZWxhdGl2ZVBhdGhdID0gaW1hZ2VEYXRhO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBhZGRQcmV2aWV3SW1hZ2UoXHJcbiAgICBkYXRhOiBTa2V0Y2hNU0RhdGEsXHJcbiAgICByZWxhdGl2ZVBhdGg6IHN0cmluZyxcclxuICAgIGVudHJ5OiB1bmtub3duXHJcbiAgKSB7XHJcbiAgICBjb25zdCBpbWFnZURhdGEgPSBhd2FpdCB0aGlzLmV4dHJhY3RCYXNlNjQocmVsYXRpdmVQYXRoLCBlbnRyeSk7XHJcbiAgICBkYXRhLnByZXZpZXdzLnB1c2goaW1hZ2VEYXRhKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgZXh0cmFjdEpzb24oX3JlbGF0aXZlUGF0aDogc3RyaW5nLCBlbnRyeTogdW5rbm93bikge1xyXG4gICAgaWYgKGVudHJ5QXN5bmNDaGVjayhlbnRyeSkpIHtcclxuICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IGVudHJ5LmFzeW5jKCdzdHJpbmcnKTtcclxuICAgICAgcmV0dXJuIEpTT04ucGFyc2UoY29udGVudCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0pTWmlwIHVuZGVmaW5lZCBhc3luYyBmdW5jdGlvbicpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBleHRyYWN0QmFzZTY0KHJlbGF0aXZlUGF0aDogc3RyaW5nLCBlbnRyeTogdW5rbm93bikge1xyXG4gICAgaWYgKGVudHJ5QXN5bmNDaGVjayhlbnRyeSkpIHtcclxuICAgICAgcmV0dXJuIGVudHJ5LmFzeW5jKCdiYXNlNjQnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignSlNaaXAgdW5kZWZpbmVkIGFzeW5jIGZ1bmN0aW9uJyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==