var user = {
  userid: '987654321',
  username: 'xingo',
  avatar: 'http://tva2.sinaimg.cn/crop.802.675.420.420.180/6b8bbe7ejw8f8ixud41otj21kw17uqmz.jpg'
};

var forwardWeibo = {
  weiboid: '123456789',
  text: 'abcdefg，今天是个好天气@测试 ，[微笑]测试[哈哈]',
  time: '1479649079293',
  user: user,
  liked: false,
  favourited: true,
  like: 0,
}
var forwardWeibo2 = {
  weiboid: '65413213213213',
  text: 'abcdefg，今天是个好天气@测试 ，[微笑]测试[哈哈]',
  time: '1479649079293',
  user: user,
  liked: false,
  favourited: true,
  like: 0,
}

var forwards = {
  total: 90,
  forwards:  [forwardWeibo,forwardWeibo2],
};

export {forwards};
