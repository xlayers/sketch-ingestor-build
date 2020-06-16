import { __awaiter, __generator, __read } from 'tslib';
import { Injectable, ɵɵdefineInjectable, NgModule } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
        return __awaiter(this, void 0, void 0, function () {
            var data, files;
            var _this = this;
            return __generator(this, function (_a) {
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
                                var _b = __read(_a, 2), relativePath = _b[0], entry = _b[1];
                                return __awaiter(_this, void 0, void 0, function () {
                                    var objectName;
                                    return __generator(this, function (_c) {
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
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
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
        return __awaiter(this, void 0, void 0, function () {
            var jszip, zipFileInstance, files_1;
            return __generator(this, function (_a) {
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
        return __awaiter(this, void 0, void 0, function () {
            var content;
            return __generator(this, function (_a) {
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
        return __awaiter(this, void 0, void 0, function () {
            var content, e_1;
            return __generator(this, function (_a) {
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
        return __awaiter(this, void 0, void 0, function () {
            var imageData;
            return __generator(this, function (_a) {
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
        return __awaiter(this, void 0, void 0, function () {
            var imageData;
            return __generator(this, function (_a) {
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
        return __awaiter(this, void 0, void 0, function () {
            var content;
            return __generator(this, function (_a) {
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
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
    /** @nocollapse */ SketchIngestorService.ngInjectableDef = ɵɵdefineInjectable({ factory: function SketchIngestorService_Factory() { return new SketchIngestorService(); }, token: SketchIngestorService, providedIn: "root" });
    return SketchIngestorService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SketchIngestorModule = /** @class */ (function () {
    function SketchIngestorModule() {
    }
    SketchIngestorModule.decorators = [
        { type: NgModule }
    ];
    return SketchIngestorModule;
}());

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
