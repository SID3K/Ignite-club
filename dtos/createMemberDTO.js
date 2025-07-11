/**
 * @typedef {Object} MemberDTO
 * @property {string} memberName - Full name of the member (required)
 * @property {string} username - Unique username of the member (required)
 * @property {string} [email] - Email address (optional)
 */

class CreateMemberDTO {
  constructor({ memberName, username, email }) {
    this.memberName = memberName;
    this.username = username;
    this.email = email ?? null;
  }
}

module.exports = CreateMemberDTO;