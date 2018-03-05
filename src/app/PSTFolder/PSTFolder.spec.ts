import { PSTFolder } from './PSTFolder.class';
import * as chai from 'chai';
import * as mocha from 'mocha';
import { PSTFile } from '../PSTFile/PSTFile.class';
const resolve = require('path').resolve
const expect = chai.expect;
let pstFile: PSTFile;

before(() => {
    pstFile = new PSTFile(resolve('./src/testdata/michelle_lokay_000_1_1_1_1.pst'));
});

after(() => {
    pstFile.close();
});

describe('PSTFolder tests', () => {
    it('should have a root folder', () => {
        const folder: PSTFolder = pstFile.getRootFolder();
        expect(folder).to.not.be.null;
        expect(folder.subFolderCount).to.equal(3);
        expect(folder.hasSubfolders).to.be.true;
    });

    // folder structure should look like:
    // Personal folders
    //  |- Top of Personal Folders
    //  |  |- Deleted Items
    //  |  |- lokay-m
    //  |  |  |- MLOKAY (Non-Privileged)
    //  |  |  |  |- TW-Commercial Group
    //  |  |  |  |- Systems
    //  |  |  |  |- Sent Items
    //  |  |  |  |- Personal
    //  |- Search Root
    //  |- SPAM Search Folder 2

    it('root folder should have sub folders', () => {
        let childFolders: PSTFolder[] = pstFile.getRootFolder().getSubFolders();
        expect(childFolders.length).to.equal(3);
        let folder = childFolders[0];
        expect(folder.subFolderCount).to.equal(2);
        expect(folder.getDisplayName()).to.equal('Top of Personal Folders');
        childFolders = folder.getSubFolders();
        folder = childFolders[0];
        expect(folder.getDisplayName()).to.equal('Deleted Items');
        folder = childFolders[1];
        expect(folder.getDisplayName()).to.equal('lokay-m');
        childFolders = folder.getSubFolders();
        folder = childFolders[0];
        expect(folder.getDisplayName()).to.equal('MLOKAY (Non-Privileged)');
        childFolders = folder.getSubFolders();
        expect(childFolders[0].getDisplayName()).to.equal('TW-Commercial Group');
        expect(childFolders[1].getDisplayName()).to.equal('Systems');
        expect(childFolders[2].getDisplayName()).to.equal('Sent Items');
        expect(childFolders[3].getDisplayName()).to.equal('Personal');
    });
});