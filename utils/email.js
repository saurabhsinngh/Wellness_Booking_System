
class Email{
    async sendMockEmail (to, subject, body) {
    console.log(`
        ========= MOCK EMAIL =========
        To: ${to}
        Subject: ${subject}
        -------------------------------
        ${body}
        ===============================
    `);
};

}

module.exports = new Email()
