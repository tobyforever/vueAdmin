<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="formInline.orgin" placeholder="始发地"></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker type="date" placeholder="出发日期" v-model="formInline.flightdate"
                          style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button >查询</el-button>
          <el-button >导出</el-button>
        </el-form-item>
        <!--<el-form-item>-->
        <!--<el-button @click="handleAdd">新增</el-button>-->
        <!--</el-form-item>-->
      </el-form>
    </el-col>

    <!--列表-->
    <template>
      <el-table border :data="flightData.flights" highlight-current-row v-loading="listLoading" style="width: 100%;">
        <el-table-column type="index" width="80" fixed>
        </el-table-column>
        <el-table-column prop="flightNo" label="航班号" width="100">
        </el-table-column>
        <el-table-column prop="flightDate" label="时间" width="100" :formatter="formatDate">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="100">
        </el-table-column>
        <el-table-column prop="origin" label="出发" width="80">
        </el-table-column>
        <el-table-column prop="destination" label="到达" width="80">
        </el-table-column>
        <el-table-column prop="carrier" label="航司" width="80">
        </el-table-column>
        <el-table-column prop="plane" label="机型" width="80">
        </el-table-column>
        <el-table-column prop="seats" label="余座" width="100">
        </el-table-column>
        <el-table-column prop="seq" label="候补序号" width="100">
        </el-table-column>
        <el-table-column inline-template :context="_self" label="操作" width="100" fixed="right">
					<span>
					<!--<el-button type="text" size="small" @click="handleEdit(row)">编辑</el-button>-->
            <!--<el-button type="text" size="small" @click="handleDel(row)">删除</el-button>-->
            <el-button type="text" size="small" @click="confirmHouBu(row)">候补成功确认</el-button>
				</span>
        </el-table-column>
      </el-table>
    </template>

    <!--分页-->
    <el-col :span="24" class="toolbar" style="padding-bottom:10px;">
      <el-pagination :current-page="1" :page-sizes="[100, 200, 300, 400]" :page-size="100"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="400" style="float:right">
      </el-pagination>
    </el-col>

    <!--编辑界面-->
    <el-dialog :title="editFormTtile" v-model="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <!--<el-select v-model="editForm.sex" placeholder="请选择性别">
                        <el-option label="男" :value="1"></el-option>
                        <el-option label="女" :value="0"></el-option>
                    </el-select>-->
          <el-radio-group v-model="editForm.sex">
            <el-radio class="radio" :label="1">男</el-radio>
            <el-radio class="radio" :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
        </el-form-item>
        <el-form-item label="地址">
          <el-input type="textarea" v-model="editForm.addr"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">{{btnEditText}}</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script type="text/babel">
  import NProgress from 'nprogress'
  import moment from 'moment'
  import util from '../../scripts/common/util'

  export default {
    name: 'hbflight-list',
    data() {
      return {
        formInline: {
          origin: '',
          flightdate: '',
        },
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        value1: '',
        //编辑界面显是否显示
        editFormVisible: false,
        //编辑界面标题
        editFormTtile: '编辑',
        //编辑界面数据
        editForm: {
          id: 0,
          name: '',
          sex: -1,
          age: 0,
          birth: '',
          addr: ''
        },
        editLoading: false,
        btnEditText: '提 交',
        editFormRules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ]
        },
        flightData: {
          'hbflag': 1,
          'orig': 'PEK',
          'fdate': '2016-12-5',
          'passengers': [{'name': 'yige', 'sex': 1, 'idType': 1, 'idnumber': 'wang2_222', 'mobile': '139xxx2'}],
          'flights': [{
            'origin': 'PEK',
            'destination': 'HAK',
            'flightNo': 'CA1355',
            'flightDate': '1480918500000',
            'plane': '32A',
            'carrier': 'CA',
            'seats': 0,
            'seq': 2
          }, {
            'origin': 'PEK',
            'destination': 'HAK',
            'flightNo': 'CZ6366',
            'flightDate': '1480921500000',
            'plane': '321',
            'carrier': 'CZ',
            'seats': 10,
            'seq': 2
          }, {
            'origin': 'PEK',
            'destination': 'HAK',
            'flightNo': 'ZH1355',
            'flightDate': '1480918500000',
            'plane': '32A',
            'carrier': 'ZH',
            'seats': 0,
            'seq': 2
          }, {
            'origin': 'PEK',
            'destination': 'HAK',
            'flightNo': 'CA1355',
            'flightDate': '1480918500000',
            'plane': '32A',
            'carrier': 'CA',
            'seats': 0,
            'seq': 4
          }, {
            'origin': 'PEK',
            'destination': 'HAK',
            'flightNo': 'CZ6158',
            'flightDate': '1480941600000',
            'plane': '321',
            'carrier': 'CZ',
            'seats': 10,
            'seq': 15
          }, {
            'origin': 'PEK',
            'destination': 'HAK',
            'flightNo': 'CZ6158',
            'flightDate': '1480941600000',
            'plane': '321',
            'carrier': 'CZ',
            'seats': 10,
            'seq': 14
          }, {
            'origin': 'PEK',
            'destination': 'HAK',
            'flightNo': 'MF4018',
            'flightDate': '1480921500000',
            'plane': '321',
            'carrier': 'MF',
            'seats': 10,
            'seq': 2
          }, {
            'origin': 'PEK',
            'destination': 'HAK',
            'flightNo': 'MF1837',
            'flightDate': '1480941600000',
            'plane': '321',
            'carrier': 'MF',
            'seats': 10,
            'seq': 15
          }, {
            'origin': 'PEK',
            'destination': 'HAK',
            'flightNo': 'HU7282',
            'flightDate': '1480943400000',
            'plane': '331',
            'carrier': 'HU',
            'seats': 10,
            'seq': 15
          }, {
            'origin': 'PEK',
            'destination': 'HAK',
            'flightNo': 'MF1837',
            'flightDate': '1480941600000',
            'plane': '321',
            'carrier': 'MF',
            'seats': 10,
            'seq': 2
          }, {
            'origin': 'PEK',
            'destination': 'HAK',
            'flightNo': 'ZH1355',
            'flightDate': '1480918500000',
            'plane': '32A',
            'carrier': 'ZH',
            'seats': 0,
            'seq': 4
          }, {
            'origin': 'PEK',
            'destination': 'HAK',
            'flightNo': 'MF1020',
            'flightDate': '1480915200000',
            'plane': '321',
            'carrier': 'MF',
            'seats': 10,
            'seq': 4
          }, {
            'origin': 'PEK',
            'destination': 'HAK',
            'flightNo': 'HU7282',
            'flightDate': '1480943400000',
            'plane': '331',
            'carrier': 'HU',
            'seats': 10,
            'seq': 14
          }, {
            'origin': 'PEK',
            'destination': 'HAK',
            'flightNo': 'CZ6366',
            'flightDate': '1480921500000',
            'plane': '321',
            'carrier': 'CZ',
            'seats': 10,
            'seq': 4
          }, {
            'origin': 'PEK',
            'destination': 'HAK',
            'flightNo': 'HU7782',
            'flightDate': '1480926000000',
            'plane': '787',
            'carrier': 'HU',
            'seats': 10,
            'seq': 4
          }, {
            'origin': 'PEK',
            'destination': 'HAK',
            'flightNo': 'HU7776',
            'flightDate': '1480935900000',
            'plane': '738',
            'carrier': 'HU',
            'seats': 0,
            'seq': 14
          }, {
            'origin': 'PEK',
            'destination': 'HAK',
            'flightNo': 'HU7776',
            'flightDate': '1480935900000',
            'plane': '738',
            'carrier': 'HU',
            'seats': 0,
            'seq': 2
          }, {
            'origin': 'PEK',
            'destination': 'HAK',
            'flightNo': 'HU7182',
            'flightDate': '1480913700000',
            'plane': '738',
            'carrier': 'HU',
            'seats': 10,
            'seq': 4
          }, {
            'origin': 'PEK',
            'destination': 'HAK',
            'flightNo': 'CZ6158',
            'flightDate': '1480941600000',
            'plane': '321',
            'carrier': 'CZ',
            'seats': 10,
            'seq': 2
          }, {
            'origin': 'PEK',
            'destination': 'HAK',
            'flightNo': 'HU7282',
            'flightDate': '1480943400000',
            'plane': '331',
            'carrier': 'HU',
            'seats': 10,
            'seq': 2
          }, {
            'origin': 'PEK',
            'destination': 'HAK',
            'flightNo': 'MF4018',
            'flightDate': '1480921500000',
            'plane': '321',
            'carrier': 'MF',
            'seats': 10,
            'seq': 4
          }, {
            'origin': 'PEK',
            'destination': 'HAK',
            'flightNo': 'MF1020',
            'flightDate': '1480915200000',
            'plane': '321',
            'carrier': 'MF',
            'seats': 10,
            'seq': 2
          }, {
            'origin': 'PEK',
            'destination': 'HAK',
            'flightNo': 'HU7782',
            'flightDate': '1480926000000',
            'plane': '787',
            'carrier': 'HU',
            'seats': 10,
            'seq': 2
          }, {
            'origin': 'PEK',
            'destination': 'HAK',
            'flightNo': 'MF1837',
            'flightDate': '1480941600000',
            'plane': '321',
            'carrier': 'MF',
            'seats': 10,
            'seq': 14
          }, {
            'origin': 'PEK',
            'destination': 'HAK',
            'flightNo': 'CZ3120',
            'flightDate': '1480915200000',
            'plane': '321',
            'carrier': 'CZ',
            'seats': 10,
            'seq': 2
          }, {
            'origin': 'PEK',
            'destination': 'HAK',
            'flightNo': 'HU7182',
            'flightDate': '1480913700000',
            'plane': '738',
            'carrier': 'HU',
            'seats': 10,
            'seq': 2
          }, {
            'origin': 'PEK',
            'destination': 'HAK',
            'flightNo': 'HU7776',
            'flightDate': '1480935900000',
            'plane': '738',
            'carrier': 'HU',
            'seats': 0,
            'seq': 15
          }, {
            'origin': 'PEK',
            'destination': 'HAK',
            'flightNo': 'CZ3120',
            'flightDate': '1480915200000',
            'plane': '321',
            'carrier': 'CZ',
            'seats': 10,
            'seq': 4
          }],
          'tickets': [{'pnr': 'ORG188889', 'ticketNo': '1123456'}],
          'Id': 0,
          'App': 'imall',
          'Service': 'queryHbFlightList',
          'Version': '1',
          'Sign': null,
          'ReplyId': 'http-8080-1',
          'Result': null,
          'Key': null,
          'TrackInfo': null
        },
//        tableData: [{
//          id: 1000,
//          name: 'lanqy1',
//          sex: 1,
//          age: 20,
//          birth: '1996-03-02',
//          addr: '广东广州天河体育中心'
//        }, {
//          id: 1001,
//          name: 'lanqy2',
//          sex: 1,
//          age: 20,
//          birth: '1996-03-02',
//          addr: '广东广州天河体育中心'
//        }, {
//          id: 1002,
//          name: 'lanqy3',
//          sex: 0,
//          age: 20,
//          birth: '1996-03-02',
//          addr: '广东广州天河体育中心'
//        }, {
//          id: 1003,
//          name: 'lanqy4',
//          sex: 1,
//          age: 20,
//          birth: '1996-03-02',
//          addr: '广东广州天河体育中心'
//        }, {
//          id: 1004,
//          name: 'lanqy5',
//          sex: 1,
//          age: 20,
//          birth: '1996-03-02',
//          addr: '广东广州天河体育中心'
//        }, {
//          id: 1005,
//          name: 'lanqy6',
//          sex: 1,
//          age: 20,
//          birth: '1996-03-02',
//          addr: '广东广州天河体育中心'
//        }, {
//          id: 1006,
//          name: 'lanqy7',
//          sex: 1,
//          age: 20,
//          birth: '1996-03-02',
//          addr: '广东广州天河体育中心'
//        }, {
//          id: 1007,
//          name: 'lanqy8',
//          sex: 1,
//          age: 20,
//          birth: '1996-03-02',
//          addr: '广东广州天河体育中心'
//        }],
        listLoading: false
      }
    },
    methods: {
      //性别显示转换
      formatSex(row, column) {
        if (row.sex === 1) {
          return '男';
        } else if (row.sex === 0) {
          return '女';
        }
        return '未知';
      },
      formatDate(row, column) {
        const date = (+row.flightDate) / 1000;
        return moment.unix(date).format('HH:mm');
      },
      confirmHouBu(row) {
        console.log('候补成功确认...')
        console.dir(row)
      },
      //删除记录
      handleDel(row) {
        //console.log(row);
        const that = this;
        this.$confirm('确认删除该记录吗?', '提示', {
          //type: 'warning'
        }).then(() => {
          that.listLoading = true;
          NProgress.start();
          setTimeout(()=> {
            for (let i = 0; i < that.tableData.length; i++) {
              if (that.tableData[i].id === row.id) {
                that.tableData.splice(i, 1);

                that.listLoading = false;
                NProgress.done();
                that.$notify({
                  title: '成功',
                  message: '删除成功',
                  type: 'success'
                });

                break;
              }
            }
          }, 1000);
        }).catch(() => {

        });
      },
      //显示编辑界面
      handleEdit(row) {
        this.editFormVisible = true;
        this.editFormTtile = '编辑';
        this.editForm.id = row.id;
        this.editForm.name = row.name;
        this.editForm.sex = row.sex;
        this.editForm.age = row.age;
        this.editForm.birth = row.birth;
        this.editForm.addr = row.addr;
      },
      //编辑 or 新增
      editSubmit() {
        const that = this;

        that.$refs.editForm.validate((valid)=> {
          if (valid) {
            that.$confirm('确认提交吗？', '提示', {}).then(()=> {
              that.editLoading = true;
              NProgress.start();
              that.btnEditText = '提交中';
              setTimeout(()=> {
                that.editLoading = false;
                NProgress.done();
                that.btnEditText = '提 交';
                that.$notify({
                  title: '成功',
                  message: '提交成功',
                  type: 'success'
                });
                that.editFormVisible = false;

                if (that.editForm.id === 0) {
                  //新增
                  that.tableData.push({
                    id: new Date().getTime(),
                    name: that.editForm.name,
                    sex: that.editForm.sex,
                    age: that.editForm.age,
                    birth: that.editForm.birth === '' ? '' : util.formatDate.format(new Date(that.editForm.birth), 'yyyy-MM-dd'),
                    addr: that.editForm.addr
                  });
                } else {
                  //编辑
                  for (let i = 0; i < that.tableData.length; i++) {
                    if (that.tableData[i].id === that.editForm.id) {
                      that.tableData[i].name = that.editForm.name;
                      that.tableData[i].sex = that.editForm.sex;
                      that.tableData[i].age = that.editForm.age;
                      that.tableData[i].birth = that.editForm.birth === '' ? '' : util.formatDate.format(new Date(that.editForm.birth), 'yyyy-MM-dd');
                      that.tableData[i].addr = that.editForm.addr;
                      break;
                    }
                  }
                }
              }, 1000);
            });
          }
        });
      },
      //显示新增界面
      handleAdd() {
        this.editFormVisible = true;
        this.editFormTtile = '新增';
        this.editForm.id = 0;
        this.editForm.name = '';
        this.editForm.sex = 1;
        this.editForm.age = 0;
        this.editForm.birth = '';
        this.editForm.addr = '';
      }
    }
  }
</script>

<style scoped>
  .toolbar .el-form-item {
    margin-bottom: 10px;
  }

  .toolbar {
    background: #fff;
    padding: 10px 10px 0px 10px;
  }
</style>
