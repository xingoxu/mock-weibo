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
  like: 350,
  liked: false,
}
var comment2 = {
  user: user,
  userid: '987654321',
  username: 'xingo',
  commentid: '1234343',
  text: '好天气就要@测试 ，大家说是不是啊！[哈哈]',
  time: '1479649004555',
  like: 350,
  liked: false,
}

var comments = {
  total: 90,
  comments:  [comment,comment2],
};

export {comments};
