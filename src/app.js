import React from 'react';
import {testPost, getCheckRes, testGet, saveImg, getDataSource, del} from './service/api'
import {Upload, message, Button, Table} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import './app.scss'

const conf = {
  baseUrl: 'http://localhost:8112'
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      columns: [
        {
          title: 'origin_url',
          dataIndex: 'origin_url',
          key: 'origin_url',
          width: 100,

        },
        {
          title: 'switch_url',
          dataIndex: 'switch_url',
          key: 'switch_url',
          width: 100,

        },
        {
          title: '是否检测',
          dataIndex: 'is_switch',
          key: 'is_switch',
          width: 100,
        },
        {
          title: '检测结果',
          key: 'check_res',
          dataIndex: 'check_res',
          width: 100,

        },
        {
          title: 'create_time',
          key: 'create_time',
          dataIndex: 'create_time',
          width: 100,

        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Button type='danger' onClick={() => {
              this.del(record)
            }}>删除</Button>
          ),
        },
      ],
      dataSource: [],
      originUrl: "https://www.baidu.com/img/dong_30a61f45c8d4634ca14da8829046271f.gif",
      switchUrl: "https://www.baidu.com/img/dong_30a61f45c8d4634ca14da8829046271f.gif"
    }
  }

  componentDidMount() {

    this.getDataSource();
  }

  del = (data) => {
    del(data)
      .then(res => {
        console.log(res)
        this.getDataSource();
      })
  }
  /*
  * 获取全部保存的数据
  * */
  getDataSource = () => {
    getDataSource()
      .then(res => {
        console.log(res)
        this.setState({
          dataSource: res.data.results
        })
      })
  }
  // uploadFile = (e) => {
  // 	console.log(e);
  // 	console.log(e.target.files);
  // 	console.log();
  // 	const fileObj = e.target.files[0]; // js 获取文件对象
  // 	const form = new FormData(); // FormData 对象
  // 	form.append("files", fileObj); // 文件对象
  // 	uploadFile(form)
  // 	.then(res => {
  // 		console.log(res)
  // 	})
  // }
  /*
  * 测试接口
  * */
  send = () => {
    testGet()
      .then(res => {
        /*
      * 响应结果
      * */
        console.log(res)
      })
  }
  /*
  * 测试接口
  * */
  sendPost = () => {
    testPost({data: "testPost"})
      .then(res => {
        /*
        * 响应结果
        * */
        console.log(res)
      })
  }
  /*
  * 获取检测结果
  * */
  getCheckRes = () => {
    let {originUrl} = this.state;
    getCheckRes({origin_url: originUrl})
      .then(res => {
        /*
        * 响应结果
        * */
        console.log(res)
        let img = res.data.results[0] || {};
        this.setState({
          switchUrl: img.switch_url || img.origin_url,
        })
      })
  }

  /*
  * 上传之后报错
  * */
  saveImg = () => {
    let {originUrl} = this.state;
    saveImg({origin_url: originUrl})
      .then(res => {
        message.warn("保存成功")
        console.log(res)
        this.getDataSource();
      })
  }
  render = () => {
    const props = {
      name: 'file',
      action: conf.baseUrl + '/api/upload',
      onChange: (info) => {
        console.log(info)
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
          let switchUrl = conf.baseUrl + Object.values(info.file.response)
          this.setState({
            switchUrl,
            originUrl: switchUrl
          }, () => {
            // 上传图片之后，就保存图片到数据库
            this.saveImg()
          })
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    let {originUrl, switchUrl, columns, dataSource} = this.state;
    return (<div className='page-wrap'>
      <h3>人脸检测</h3>
      <div>
        <Button onClick={this.send}>发送 GET 请求</Button>
        <Button onClick={this.sendPost}>发送 POST 请求</Button>
      </div>
      <br/>
      <div>
        <Upload {...props}>
          <Button type='primary' icon={<UploadOutlined/>}>点击上传</Button>
        </Upload>
      </div>
      <div className='content-wrap'>
        <div className='left'>
          <h4>上传图片</h4>
          <div className="img-wrap" onClick={this.getCheckRes}>
            <img src={originUrl}/>
          </div>
        </div>
        <div className='right'>
          <h4>识别结果</h4>
          <div className="img-wrap">
            <img src={switchUrl}/>
          </div>
        </div>
        <div className='clear'/>
      </div>

      <div className='info'>
        <h4>已保存的图片</h4>
        <div>
          <Table columns={columns}
                 pagination={false}
                 dataSource={dataSource}/>
        </div>
      </div>
    </div>)
  }
}

export default App;
