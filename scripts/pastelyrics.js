// pastes the clipboard content to the selected notes as lyrics
var SCRIPT_TITLE = "Paste Lyrics";

// the separator to use between each lyric when pasting to multiple notes
var DELIMITER = ' ';

function getClientInfo() {
  return {
    "name": SV.T(SCRIPT_TITLE),
    "category": "Lewis' Scripts",
    "author": "https://github.com/githubLewis/synthvscripts/",
    "versionNumber": 1,
    "minEditorVersion": 65537
  }
}

var SCRIPT_TITLE = "Paste Lyrics";
var DELIMITER = ' ';
var SCALE = [60, 62, 64, 67, 69];

function createNoteGroup(groupName) {
  var mainProject = SV.getProject();
  var newGroup = SV.create("NoteGroup");
  var newGroupReference = SV.create("NoteGroupReference");
  newGroup.setName(groupName);
  mainProject.addNoteGroup(newGroup, 0);
  newGroupReference.setTarget(newGroup);
  mainProject.getTrack(0).addGroupReference(newGroupReference);
  return newGroup;
}

function pasteLyrics() {
  var groupName = SV.showInputBox("Create Group",
        "Please tell me the group name", "FooBar Group");

  if(groupName == "") {
    SV.finish();
    return;
  }

   next(groupName);
}

function next(groupName) {
  var newGroup = createNoteGroup(groupName);
  addLyricsToGroup(newGroup);
}

function addLyricsToGroup(noteGroup) {
  var clipboardText = SV.getHostClipboard();
  var lines = clipboardText.split(/\r\n|\n/);
  var lyricCount = 0;

  for (var i = 0; i < lines.length; i++) {
    var words = lines[i].split(DELIMITER);
    for (var j = 0; j < words.length; j++) {
      if (words[j].length > 0) {

        var n = SV.create("Note");
        n.setTimeRange(lyricCount * SV.QUARTER, SV.QUARTER);
        n.setPitch(SCALE[lyricCount % SCALE.length]);
        n.setLyrics(words[j]);
        noteGroup.addNote(n);

        lyricCount++;
      }
    }
  }
}

function main() {
  pasteLyrics();
  SV.finish();
}