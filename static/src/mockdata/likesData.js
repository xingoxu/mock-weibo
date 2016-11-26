var user = {
  userid: '987654321',
  username: 'xingo',
  avatar: 'http://tva2.sinaimg.cn/crop.802.675.420.420.180/6b8bbe7ejw8f8ixud41otj21kw17uqmz.jpg'
};
var like = {
  likeid: '1231',
  user: user,
  time: '1479649004555',
  weibo: {
    weiboid: '123456',
    text: '科科',
  }
}
var like2 = {
  likeid: '123145',
  user: user,
  time: '1479649004555',
  comment: {
    weiboid: '123456',
    text: '科科',
  }
}
var likes = [like,like2];
export {likes};
