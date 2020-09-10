import axios from 'axios';
/**   列表查询 **/
export const getSiteList = params => {
    return axios.post(params.url, params).then(res => res.data);
};
/** 添加/编辑 信息 **/
export const addSiteInfo = params => { return axios.post(params.url, params).then(res => res.data); };
/***  信息*/
export const waterNameInfo = params => {
    return axios.post(params.url, params).then(res => res.data);
};
/*** 物模型列表*/
export const getModuleList = params => {
    return axios.post(params.url, params).then(res => res.data);
};

/*** 物模型列表-设备类型*/
export const getDeviceTypeList = params => {
    return axios.post(params.url, params).then(res => res.data);
};

/** 添加/编辑 物模型 信息 **/
export const createModule = params => { return axios.post(params.url, params).then(res => res.data); };

/** 创建物计算 **/
export const createComputing = params => { return axios.post(params.url, params).then(res => res.data); };

//查询设备类型
export const getDeviceType = params => {
    return axios.post(params.url, params).then(res => res.data);
};

//查询站点接口
export const getSiteInfo = params => {
    return axios.post(params.url, params).then(res => res.data);
};

//查询设备类型元数据
export const getDeviceTypeMetedata = params => {
    return axios.post(params.url, params).then(res => res.data);
};
