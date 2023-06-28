'use client';
import style from './Form.module.scss';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import Select from 'react-select';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
// import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
// import { Button, Col, DatePicker, Form, Input, Row, Select, Space, Upload, UploadFile, message } from 'antd';
// import { RcFile, UploadChangeParam, UploadProps } from 'antd/es/upload';

const cx = classNames.bind(style);

// const { Option } = Select;
// const formItemLayout = {
//     labelCol: { span: 6 },
//     wrapperCol: { span: 14 },
// };
// const onFinish = (values: any) => {
//     console.log('Received values of form: ', values);
// };
// const FormSong: React.FC = () => {
//     const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
//     const [loading, setLoading] = useState(false);
//     const [imageUrl, setImageUrl] = useState<string>();
//     return (
//         <div className={cx('form')}>
//             <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="horizontal" >
//                 <Form.Item className={cx('label')} label="Tên bài hát">
//                     <Input />
//                 </Form.Item>
//                 <Form.Item className={cx('label')} label="Tác giả">
//                     <Select>
//                         <Select.Option value="121212">Huy</Select.Option>
//                     </Select>
//                 </Form.Item>
//                 <Form.Item className={cx('label')} label="Thể hiện">
//                     <Select>
//                         <Select.Option value="2121212">Huy</Select.Option>
//                     </Select>
//                 </Form.Item>
//                 <Form.Item className={cx('label')} name="select-Album" label="Album">
//                     <Select mode="multiple" placeholder="Chọn album của bài hát">
//                         <Option value="018271">Ngày có em</Option>
//                         <Option value="232121">Nơi Tình yêu Bắt đầu</Option>
//                         <Option value="1312313">Ngày mình chia tay</Option>
//                     </Select>
//                 </Form.Item>
//                 <Form.Item className={cx('label')} name="select-Genres" label="Thể loại">
//                     <Select mode="multiple" placeholder="Chọn thể loại cho bài hát">
//                         <Option value="loli">Loli</Option>
//                         <Option value="chill">Chill</Option>
//                         <Option value="bala">Bala</Option>
//                     </Select>
//                 </Form.Item>
//                 <Form.Item className={cx('label')} name="date-time-picker" label="Ngày sáng tác">
//                     <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
//                 </Form.Item>

//                 <Form.Item className={cx('label')} label="Hình ảnh">
//                     <input type="file" />
//                 </Form.Item>

//                 <Form.Item className={cx('label')} label="File nhạc">
//                     <input type="file" />
//                 </Form.Item>

//                 <Form.Item className={cx('label')}>
//                     <Button onClick={onFinish}>Thêm bài hát mới</Button>
//                 </Form.Item>
//             </Form>
//         </div>
//     );
// };
// export default () => <FormSong />;

const aquaticCreatures = [
    { label: 'Shark', value: '123' },
    { label: 'Dolphin', value: '213' },
    { label: 'Whale', value: '111' },
    { label: 'Octopus', value: '222' },
    { label: 'Crab', value: '333' },
    { label: 'Lobster', value: '1313' },
];

function FormCreate() {
    return (
        <div className={cx('form')}>
            <h2>Thêm bài hát mới</h2>
            <form>
                <div className={cx('col-3')}>
                    <label htmlFor="">Tiêu đề: </label>
                    <input className={cx('input')} type="text" />
                </div>
                <div className={cx('col-3')}>
                    <label htmlFor="">Ngày sáng tác: </label>
                    <input className={cx('input')} type="datetime-local" />
                </div>
                <div className={cx('col-3')}>
                    <label htmlFor="">Sáng tác: </label>
                    <select id="" name="">
                        <option value="1211312">Huy Nguyen</option>
                        <option value="1211312">Tuan Cao</option>

                    </select>
                </div>
                <div className={cx('col-3')}>
                    <label htmlFor="">Thể hiện: </label>
                    <select id="" name="">
                        <option value="1211312">Nguyễn Quang Huy</option>
                    </select>
                </div>
                <div className={cx('col-3')}>
                    <label htmlFor="">Thể Loại: </label>
                    <Select options={aquaticCreatures} isMulti className={cx('select-input')} />
                </div>
                <div className={cx('col-3')}>
                    <label htmlFor="">Album: </label>
                    <Select options={aquaticCreatures} isMulti className={cx('select-input')} />
                </div>
                <div className={cx('col-3')}>
                    <label htmlFor="">Hình ảnh: </label>
                    <input type="file" />
                </div>
                <div className={cx('col-3')}>
                    <label htmlFor="">Album: </label>
                    <input type="file" />
                </div>
                <button>Thêm bài hát</button>
            </form>
        </div>
    );
}

export default FormCreate;
