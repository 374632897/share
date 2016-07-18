{
  const doc = document, body = doc.body, All = ele => doc.querySelectorAll(ele);
  const CONTAINER = '.share-box';
  class Share {
    constructor (options) {
      this.init();
    }
    init () {
      this.initContainer();
      this.initStatus();
      this.showFirst();
      this.bindEvents();
      this.render();
    }
    initContainer () {
      this.container = All(CONTAINER); // 获取所有需要展示的容器
      this.containerPar = this.container[0].parentElement;
      this.len = this.container.length;
    }
    initStatus () {
      this.currentIndex = 0;
      this.currentAnimateQuene = [];
    }
    render () {
      this.renderFullScreenBtn();
    }
    static generateBtn (cls = 'btn', html = '按钮') {
      const ele = doc.createElement('span');
      ele.className = cls;
      ele.innerHTML = html;
      return ele;
    }
    renderFullScreenBtn () {
      const ele1 = this.fullScreenBtn = Share.generateBtn('btn full-screen-btn', '全屏');
      body.appendChild(ele1);
      // const ele2 = this.showMapBtn = Share.generateBtn('btn show-map', '查看缩略图');
      // body.appendChild(ele2);
      this.bindBtnEvents();
    }
    renderMap () {
      const containerMap = this.containerMap = doc.createElement('div');
      containerMap.className = 'container-map';
      containerMap.innerHTML = this.containerPar.innerHTML;
      body.appendChild(containerMap);
    }
    showFirst () {
      this.showBox(this.container[0]);
    }
    showBox (tar) {
      tar.addClass('showing');
    }
    hideBox (tar) {
      tar.removeClass('showing');
    }
    showNext () { // 39
      if (this.onEnd) {
        return alert('已经是最后一张了');
      }
      if (this.onStart) {
        this.onStart = false;
      }
      if (this.currentIndex === this.len - 1) return this.onEnd = true;
      const tar = this.container[this.currentIndex++];
      this.hideBox(tar);
      this.showBox(tar.nextElementSibling);
      this.setCurrentQuene();
    }
    showPrev () { // 37
      if (this.onStart) {
        return alert('已经是第一张了');
      }
      if (this.onEnd) {
        this.onEnd = false;
      }
      if (this.currentIndex === 0) return this.onStart = true;
      const tar = this.container[this.currentIndex--];
      this.hideBox(tar);
      this.showBox(tar.previousElementSibling);
      this.setCurrentQuene();
    }
    setCurrentQuene () {
      this.currentAnimateQuene = [];
      const children = this.container[this.currentIndex].children, len = children.length;
      if (len < 1) return;
      let i = 1;
      while (i < len) {
        const tar = children[i++];
        if (tar.tagName.toLowerCase() === 'ul') {
          const li = tar.children;
          if (!li.length) continue;
          [...li].forEach(item => {
            this.currentAnimateQuene.push(item);
          });
        } else {
          this.currentAnimateQuene.push(item);
        }
      }
    }
    doAnimate () {
      if (!this.currentAnimateQuene.length) return;
      const tar = this.currentAnimateQuene[0], tag = tar.tagName.toLowerCase(), times = tar.clickTimes;
      tar.addClass('shown');
      tar.clickTimes = typeof times === 'undefined' ? 1 : times + 1;
      if (!tag === 'li' || !tar.hasClass('underline')) {
        this.currentAnimateQuene.shift();
      } else {
        if (tar.hasClass('underline') && times === 1) {
          this.currentAnimateQuene.shift().addClass('show');
          delete tar.clickTimes;
        }
      }
    }
    bindEvents () {
      doc.on('keydown', this.handleKeydown.bind(this));
      doc.on('click', this.handleDocumentClick.bind(this));
    }
    handleDocumentClick (e) {
      if (!e.target.hasClass('btn')) {
        this.doAnimate();
      }
    }
    handleKeydown (e) {
      const code = e.keyCode;
      if (code === 37) {
        this.showPrev();
      }
      if (code === 39) {
        this.showNext();
      }
    }
    bindBtnEvents () {
      this.fullScreenBtn.on('click', this.fullScreen.bind(this));
      // this.showMapBtn.on('click', this.showMap.bind(this));
    }
    fullScreen () {
      this.containerPar.webkitRequestFullScreen();
    }
    showMap () {
      if (this.isMapShowing) {
        this.containerMap.removeClass('showing');
        this.isMapShowing = false;
      } else {
        this.containerMap.addClass('showing');
        this.isMapShowing = true;
      }
    }
  }
  new Share();
}

