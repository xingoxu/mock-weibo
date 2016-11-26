var user = {
  userid: '987654321',
  username: 'xingo',
  avatar: 'http://tva2.sinaimg.cn/crop.802.675.420.420.180/6b8bbe7ejw8f8ixud41otj21kw17uqmz.jpg'
};
var comment = {
  user: user,
  text: '好天气就要@测试 ，大家说是不是啊！[哈哈]',
  time: '1479649004555',
  commentid: '432311',
  weibo: {
    weiboid: '12345',
    text: '诶嘿',
  },
}
var comment2 = {
  user: user,
  commentid: '1234343',
  text: '好天气就要@测试 ，大家说是不是啊！[哈哈]',
  time: '1479649004555',
  comment: {
    weiboid: '12345',
    text: '好天气就要@测试 ，大家说是不是啊！[哈哈]好天气就要@测试 ，大家说是不是啊！[哈哈]好天气就要@测试 ，大家说是不是啊！[哈哈]',
  }
}

var comments= [comment,comment2];

export {comments};
