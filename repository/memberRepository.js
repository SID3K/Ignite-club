const Member = require('../models/member');

class MemberRepository {
  async findMemberByUserName(username) {
    return await Member.findOne({ username });
  }

  async saveMember(data) {
    return await new Member(data).save();
  }

  async getAll(){
    return await Member.find({});
  }
}

module.exports = new MemberRepository();