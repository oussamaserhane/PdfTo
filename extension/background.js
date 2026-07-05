// PDFto Chrome Extension - Background Service Worker

const PDFto_URL = 'https://PDFto.devtoolcafe.com/en';

// Create context menu when extension is installed
chrome.runtime.onInstalled.addListener(() => {
    // Create main context menu item
    chrome.contextMenus.create({
        id: 'PDFto-open',
        title: 'Open with PDFto',
        contexts: ['link', 'page']
    });

    // Create submenu for specific tools
    chrome.contextMenus.create({
        id: 'PDFto-merge',
        parentId: 'PDFto-open',
        title: 'Merge PDFs',
        contexts: ['link', 'page']
    });

    chrome.contextMenus.create({
        id: 'PDFto-compress',
        parentId: 'PDFto-open',
        title: 'Compress PDF',
        contexts: ['link', 'page']
    });

    chrome.contextMenus.create({
        id: 'PDFto-convert',
        parentId: 'PDFto-open',
        title: 'Convert to PDF',
        contexts: ['link', 'page']
    });

    chrome.contextMenus.create({
        id: 'PDFto-all-tools',
        parentId: 'PDFto-open',
        title: 'All Tools →',
        contexts: ['link', 'page']
    });

    console.log('PDFto context menus created');
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    let url = PDFto_URL;

    switch (info.menuItemId) {
        case 'PDFto-merge':
            url = `${PDFto_URL}/tools/merge-pdf`;
            break;
        case 'PDFto-compress':
            url = `${PDFto_URL}/tools/compress-pdf`;
            break;
        case 'PDFto-convert':
            url = `${PDFto_URL}/tools/jpg-to-pdf`;
            break;
        case 'PDFto-all-tools':
        case 'PDFto-open':
            url = PDFto_URL;
            break;
        default:
            url = PDFto_URL;
    }

    // Open PDFto in a new tab
    chrome.tabs.create({ url: url });
});

// Log when service worker starts
console.log('PDFto background service worker started');
