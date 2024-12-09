import javaLibrary from '../../../json/cribLibaryJs.json' assert { type: 'json' };
import gitLibrary from '../../../json/cribLibaryGit.json' assert { type: 'json' };

const libraries = {
    javaLibrary: javaLibrary,
    gitLibrary: gitLibrary
};

const jsonIdentifier = localStorage.getItem('jsonPath');
const library = libraries[jsonIdentifier];

export default library;
