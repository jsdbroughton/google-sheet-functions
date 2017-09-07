/**
 * Creates a menu entry in the Google Docs UI when the document is opened.
 *
 * @param {object} e The event parameter for a simple onOpen trigger. To
 *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
 *     running in, inspect e.authMode.
 */
function onOpen() {
    'use strict';
    try {

        var ui, context, menu, sheetType, docType, type;

        try {
            ui = DocumentApp.getUi();
            context = DocumentApp;
        } catch (err) {
            Logger.log(err);
            ui = SpreadsheetApp.getUi();
            context = SpreadsheetApp;
        }

        menu = ui.createAddonMenu();

        if (context === SpreadsheetApp) {

            try {
                sheetType = JSON.parse(PropertiesService.getDocumentProperties().getProperty('sheetType'));
            } catch (enabled) {
                Logger.log(enabled);
            }
            type = (sheetType) ? sheetType.type : null;

            menu.addItem('Add Custom Functions', 'addFunctions');
            
        } else if (context === DocumentApp) {
            try {
                docType = JSON.parse(PropertiesService.getDocumentProperties()
                    .getProperty('docType'));
            } catch (enabled) {
                Logger.log(enabled);
            }

          // Documents do not have custom functions.

        }

        GRFNTools.appsuiteType = type;

        menu.addToUi();

    } catch (elseErr) {
        Logger.log(elseErr);
        Logger.log('Not a supported Google Drive App');
    }
}

/**
 * Runs when the add-on is installed.
 *
 * @param {object} e The event parameter for a simple onInstall trigger. To
 *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
 *     running in, inspect e.authMode. (In practice, onInstall triggers always
 *     run in AuthMode.FULL, but onOpen triggers may be AuthMode.LIMITED or
 *     AuthMode.NONE.)
 */
function onInstall(e) {
    onOpen(e);
}

/**
 * Displays a confirmation of function installation.
 */
function addFunctions() {
    var title = 'stardotbmp/google-sheet-functions';
    var message = 'The functions are now available in ' +
        'this spreadsheet. More information is available in the function help ' +
        'box that appears when you start using them in a forumula.';
    var ui = SpreadsheetApp.getUi();
    ui.alert(title, message, ui.ButtonSet.OK);
}