import React from 'react';
import { Upload, Modal,message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { reDeleteImage } from '../../api';
import PropTypes from 'prop-types'
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class Image extends React.Component {
    static propTypes={
        imgs:PropTypes.array

    }
    constructor(props){
        super(props)
        let fileList=[]
        const imgs=this.props.imgs
        if(imgs&&imgs.length>0){
            fileList=imgs.map((img,index)=>{
                return {
                    uid: -index,
                    name: img.name,
                    status: 'done', // loading: 上传中, done: 上传完成, remove: 删除
                    url: img.url,
                    }
            })

        }
        this.state={
            previewVisible: false,
            previewImage: '',
            previewTitle: '',
            fileList,
        }
    }
//   state = {
//     previewVisible: false,
//     previewImage: '',
//     previewTitle: '',
//     fileList: [],
//   };
  //获取图片列表
  getImgs=()=>{
      return this.state.fileList
  }
    //   关闭大图预览
  handleCancel = () => this.setState({ previewVisible: false });
    //   打开大图预览
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };
  //添加图片
  handleChange = async({ fileList,file }) => {
    if (file.status === 'done') {
        const result = file.response
        if (result.status === 0) {
            message.success('上传成功了')
            const {name, url} = result.data
            file = fileList[fileList.length - 1]
            file.name = name
            file.url = url
        } else {
            message.error('上传失败了')
        }
    }else if (file.status === 'removed') { // 删除图片
        const result = await reDeleteImage(file.name)
        if(result.status===0) {
            message.success('删除图片成功')
        }else {
            message.error("删除图片失败")
        }
    }
    this.setState({ fileList })
  };

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          action="/manage/img/upload"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          name="image"
          accept="image/*"
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="img" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}