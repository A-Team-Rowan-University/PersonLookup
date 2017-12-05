
var spreadsheet_id = "1u6fW17Vj9Sri_n1qisWGNpGca0n5_V4-lhkYgi9E2FA";

var spreadsheet = SpreadsheetApp.openById(spreadsheet_id);
var users_sheet = spreadsheet.getSheetByName("Users");
var users_range = users_sheet.getRange(1, 1, users_sheet.getLastRow(), users_sheet.getLastColumn());

var headers = users_range.getValues()[0];

function getUser(row) {
    user = {};
    for (i = 0; i < headers.length; i++) {
        column = headers[i];
        user[column] = users_range.getValues()[row][i];
    }
    return user;
}

function lookupPerson(field, value, row_only) {
    var column = headers.indexOf(field);

    var values = users_range.getValues();

    for (row = 0; row < values.length; row++) {
        if (values[row][column] === value) {
            if(row_only) {
                return row;
            } else {
                return getUser(row);
            }
        }
   }
}

function updatePerson(lookup_field, lookup_value, update_field, update_value) {
    var row = lookupPerson(lookup_field, lookup_value, row_only = true);
    var person = getUser(row);
    users_range.setValue(row + 1, headers.indexOf(update_field) + 1, update_value);
}

function tests() {

    var user1 = getUser(3);
    Logger.log(JSON.stringify(user1));

    var user2 = lookupPerson("Last Name", "Hollabaugh");
    Logger.log(JSON.stringify(user2));

    updatePerson("Email", "test@rowan.edu", "Card ID", Math.random()*10000000);
}

