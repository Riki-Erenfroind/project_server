const db = {
    books: [
        { id: 1, name: "הארי פוטר", category: "פנטזיה", price: 70, isBorrowed: false, borrowDate: null, clientId: null },
        { id: 2, name: "שר הטבעות", category: "פנטזיה", price: 90, isBorrowed: true, borrowDate: "2026-04-01", clientId: 101 },
        { id: 3, name: "תולדות הזמן", category: "מדע", price: 60, isBorrowed: false, borrowDate: null, clientId: null }
    ],
    users: [
        { id: 101, username: "israel", email: "israel@gmail.com", password: "123", borrowedBooks: [2] },
        { id: 102, username: "sara", email: "sara@gmail.com", password: "456", borrowedBooks: [] }
    ]
};

module.exports = db;