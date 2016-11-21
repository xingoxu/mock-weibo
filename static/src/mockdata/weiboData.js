var user = {
  userid: '987654321',
  username: 'xingo',
  avatar: 'http://tva2.sinaimg.cn/crop.802.675.420.420.180/6b8bbe7ejw8f8ixud41otj21kw17uqmz.jpg'
};
var singleWeibo = {
  weiboid: '12345',
  user: user,
  text: 'abcdefg，今天是个好天气@测试 ，[微笑]测试[哈哈]',
  pics: ['http://wsqncdn.miaopai.com/stream/a9ukbYtdFibmwKEgeVboyQ___m.jpg','http://ww4.sinaimg.cn/large/6b8bbe7egw1f9rk0b5py8j20vx0hy0zl.jpg','http://ww1.sinaimg.cn/large/6b8bbe7egw1f9rk071we9j20vc0h5wm6.jpg','http://ww2.sinaimg.cn/large/6b8bbe7egw1f9wh3jile4j20xc0xcdw7.jpg'],
  time: '1479649004555',
  forward: 30,
  comment: 5,
  like: 350,
  favourited: false,
  liked: false,
}
var forwardWeibo = {
  weiboid: '123456789',
  text: 'abcdefg，今天是个好天气@测试 ，[微笑]测试[哈哈]',
  time: '1479649079293',
  user: user,
  forwardWeibo: singleWeibo,
  liked: false,
  favourited: true,
  like: 0,
  forward: 1,
  comment: 3,
}
var timeline = [singleWeibo,forwardWeibo];
export {singleWeibo,forwardWeibo,timeline};
