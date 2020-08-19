import request from "@/utils/request";
// 加載列表
export function getList(params) {
  return request({
    url: "/BuilderTables/Load",
    method: "get",
    params,
  });
}
// 加載明細列表
export function getDetailList(params) {
  return request({
    url: "/BuilderTableColumns/Load",
    method: "get",
    params,
  });
}

// 創建一個代碼生成的模版<br>會自動創建字段明細信息，添加成功後使用BuilderTableColumnsController.Load加載字段明細<returns>返回添加的模版ID</returns>
export function add(data) {
  return request({
    url: "/BuilderTables/Add",
    method: "post",
    data,
  });
}

// 只修改表信息，不會更新明細
export function update(data) {
  return request({
    url: "/BuilderTables/Update",
    method: "post",
    data,
  });
}

// 更新明細
export function updateDetail(data) {
  return request({
    url: "/BuilderTableColumns/Update",
    method: "post",
    data,
  });
}

// 批量刪除代碼生成模版和對應的字段信息
export function del(data) {
  return request({
    url: "/BuilderTables/Delete",
    method: "post",
    data,
  });
}
// 創建實體
export function CreateEntity(data) {
  return request({
    url: "/BuilderTables/CreateEntity",
    method: "post",
    data,
  });
}

// 刪除明細
export function delDetail(data) {
  return request({
    url: "/BuilderTableColumns/Delete",
    method: "post",
    data,
  });
}
