import * as React from 'react';
import { message, Pagination } from 'antd';

declare global {
  interface Window {
    sendMessage: any;
    attachEvent: any;
  }
}
export default class FrTableComponents extends React.Component<any, any> {
  frm_url: string;
  fr_tbl_width: number;
  frm_param: {
    no_pageSize: number;
    mouseenter: boolean;
    mouseenter_gt: number;
    mouseenter_lt: number;
  };
  iframe_div: HTMLDivElement | null;
  frm_dom: HTMLIFrameElement | null;
  reportCode: string;
  static printReport: (
    ifr_cw: FrTableComponents,
    reportCode: string,
    reportParam: string,
  ) => void;
  constructor(props: any) {
    super(props);
    this.state = {
      pagination: {
        current: 1,
        total: 0,
        pageSize: 10,
      },
    };

    this.reportCode = props.reportCode;
    this.frm_param = props.param;
    this.frm_url =
      './fr/redirectFr?code=' +
      this.reportCode +
      '&param=' +
      encodeURI(JSON.stringify(this.frm_param));
    //{ "no_pageSize": 1, "mouseenter": true, "mouseenter_gt": 0, "mouseenter_lt": 100 };
    //this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage = () => {
    const cb = (json: any) => {
      //eval(json);
      if (json) {
        var j = eval('(' + json + ')');
        if (j.beforetoexcel) {
        } else if (j.afterload) {
          if (this.frm_dom) {
            this.frm_dom.height = j.afterload.div_height;
            this.fr_tbl_width = j.afterload.tbl_width;
            this.sentFrResizeWidth();
            let pagesize = parseInt(j.afterload.pageSize);
            this.setState({
              pagination: {
                ...this.state.pagination,
                pageSize: pagesize,
                pageSizeOptions: [pagesize + ''],
                current: j.afterload.currentPageIndex,
                total: pagesize * j.afterload.reportTotalPage,
              },
            });
          }
        }
      }
    };
    if (window.postMessage) {
      if (window.addEventListener) {
        window.addEventListener(
          'message',
          function(e) {
            cb.call(window, e.data);
          },
          false,
        );
      } else if (window.attachEvent) {
        window.attachEvent('onmessage', function(e: any) {
          cb.call(window, e.data);
        });
      }
      return (data: any, ifr: any) => {
        ifr.postMessage(data, '*');
      };
    } else {
      var hash = '';

      setInterval(function() {
        if (window.name !== hash) {
          hash = window.name;
          cb.call(window, hash);
        }
      }, 200);
      return function(data: any, ifr: any) {
        ifr.name = data;
      };
    }
  };

  componentDidMount() {
    window.sendMessage = this.sendMessage();
    window.addEventListener('resize', this.onWindowResize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }
  onWindowResize = () => {
    var that = this;
    setTimeout(function() {
      that.sentFrResizeWidth();
    }, 300);
  };

  private sentFrResizeWidth = () => {
    let ifr_cw = this.frm_dom;
    if (!this.iframe_div || !ifr_cw) return;
    let wid = this.iframe_div.clientWidth;
    if (wid > this.fr_tbl_width) {
      let s = 'setFrameWidth(' + wid + ')';
      window.sendMessage(s, ifr_cw.contentWindow);
      ifr_cw.width = '100%';
    } else {
      let s = 'setFrameWidth(' + this.fr_tbl_width + ')';
      window.sendMessage(s, ifr_cw.contentWindow);
      ifr_cw.width = this.fr_tbl_width + '';
    }
  };

  onSearchClick = (v: any) => {
    if (!this.frm_dom) return;
    if (v) {
      let c = { ...this.frm_param, ...v };
      let s = encodeURI(JSON.stringify(c));
      this.frm_dom.src =
        './fr/redirectFr?code=' + this.reportCode + '&param=' + s;
    }
  };

  render() {
    return (
      <div>
        <div
          className="page-body ant-table"
          ref={div => {
            this.iframe_div = div;
          }}
          style={{ margin: '16px 0', overflowY: 'hidden', overflowX: 'scroll' }}
        >
          <iframe
            style={{ overflow: 'hidden' }}
            ref={iframe => {
              this.frm_dom = iframe;
            }}
            src={this.frm_url}
            width="100%"
            height="0"
            scrolling="no"
            frameBorder="0"
          />
        </div>
        <div style={{ float: 'right' }}>
          <Pagination
            showSizeChanger
            showQuickJumper
            hideOnSinglePage
            {...this.state.pagination}
            onChange={(page) => {
              window.sendMessage(
                '_g().gotoPage(' + page + ')',
                // @ts-ignore
                this.frm_dom.contentWindow,
              );
            }}
          />
        </div>
      </div>
    );
  }
}

FrTableComponents.printReport = (
  ifr: FrTableComponents,
  reportCode: string,
  printParam: string,
) => {
  // @ts-ignore
  let ifr_cw = ifr.frm_dom.contentWindow;
  $.ajax({
    url: './fr/getFrUrl',
    data: {
      code: reportCode,
      param: printParam,
    },
    cache: false,
    async: false,
    type: 'POST',
    dataType: 'json',
    success: function(data: any) {
      if (data) {
        if (data.success) {
          var s =
            'FR.doURLPDFPrint({url : "' + data.data + '",isPopUp : false})';
          window.sendMessage(s, ifr_cw);
        } else {
          message.error(data.message);
        }
      }
    },
    error: function() {
      message.error('操作异常。');
    },
  });
};
