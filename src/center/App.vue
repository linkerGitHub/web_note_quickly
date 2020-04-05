<template>
  <div class="body">
    <div
      id="note-tree"
      style="height:900px"
    />
  </div>
</template>

<script type="text/javascript">
import echarts from 'echarts'

export default {
  data() {
    return {
      chrome,
      noteTree: [],
      echarts,
      myChart: null,
      chartData: null
    }
  },
  beforeMount() {
  },
  mounted() {
    chrome.storage.local.get(null, (data) => {
      const thisView = this
      this.myChart = this.echarts.init(document.getElementById('note-tree'))

      this.chartData = thisView.dataChildrenArrBuilder(data)

      this.myChart.setOption({
        title: {
          triggerEvent: true
        },
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove',
          formatter (params, ticket) {
            let ret = `${params.data.value}<br />`
            let count = 1
            if (params.data.node) {
              for (const noteName in params.data.node.notes) {
                const note = params.data.node.notes[noteName]
                ret = `${ret + count}.${ note.content.substring(0, 30) }<br />`
                count+=1
              }
            }
            return ret;
          }
        },
        series: [
          {
            type: 'tree',

            data: [{
              name: 'root',
              children: thisView.chartData
            }],

            top: '1%',
            left: '7%',
            bottom: '1%',
            right: '20%',

            symbolSize: 7,

            label: {
              position: 'left',
              verticalAlign: 'middle',
              align: 'right',
              fontSize: 16,
            },

            leaves: {
              label: {
                position: 'right',
                verticalAlign: 'middle',
                align: 'left'
              }
            },

            roam: true,

            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
          }
        ]
      });

      this.myChart.on('click',function (params) {
      });
    })
  },
  methods: {
    dataChildrenArrBuilder(nodes) {
      const tempRetArr = []
      for(const nodeName in nodes) {
        const node = nodes[nodeName]
        const tempNode = {
          name: '',
          value: 0,
          children: [],
          node
        }
        tempNode.name = `${node.urlSegment}[${node.count}:${Object.getOwnPropertyNames(node.notes).length}]`
        tempNode.value = node.url
        tempNode.children = this.dataChildrenArrBuilder(node.children)
        tempRetArr.push(tempNode)
      }
      return tempRetArr
    }
  }
}
</script>

<style lang="less">
  @deep: ~'>>>';
  @import (less) "~element-ui/lib/theme-chalk/tree.css";

  .body {

    padding: 20px;
  }
</style>
