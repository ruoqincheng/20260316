let input;
let slider;
let button;
let sel;
let isBouncing = false;
let iframeDiv;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // 建立輸入框並設定位置
  input = createInput('淡江大學');
  input.position(20, 20);
  input.size(300, 50);
  input.style('font-size', '30px');
  input.style('background-color', '#d5bdaf');
  
  // 建立跳動按鈕，放置於輸入框右側
  button = createButton('跳動');
  button.position(340, 35);
  button.mousePressed(() => isBouncing = !isBouncing);
  
  // 建立下拉式選單，放置於按鈕右側
  sel = createSelect();
  sel.position(400, 35);
  sel.style('font-size', '24px');
  sel.option('淡江教科系', 'https://www.et.tku.edu.tw');
  sel.option('淡江大學', 'https://www.tku.edu.tw');
  sel.changed(() => iframeDiv.attribute('src', sel.value()));
  
  // 建立滑桿，範圍 15-80，預設 40
  slider = createSlider(15, 80, 40);
  slider.position(600, 35);
  
  // 設定文字大小與對齊方式
  textSize(40);
  textAlign(LEFT, CENTER);
  
  // 建立 iframe 嵌入網頁，並設定四周 200px 的邊距
  iframeDiv = createElement('iframe');
  iframeDiv.position(200, 200);
  iframeDiv.size(windowWidth - 400, windowHeight - 400);
  iframeDiv.attribute('src', 'https://www.et.tku.edu.tw');
  iframeDiv.style('opacity', '0.95');
}

function draw() {
  background(220);
  
  // 根據滑桿數值設定文字大小
  let s = slider.value();
  textSize(s);
  
  // 取得輸入框內容與寬度
  let txt = input.value();
  let w = textWidth(txt);
  
  let palette = ['#f08080', '#f4978e', '#f8ad9d', '#fbc4ab', '#ffdab9'];

  // 若有文字內容，則利用迴圈重複排列繪製於視窗中間
  if (w > 0) {
    for (let y = 140; y < height; y += s + 20) {
      let count = 0;
      for (let x = 0; x < width; x += w + 20) {
        fill(palette[count % palette.length]);
        
        // 計算波浪偏移量
        let yOffset = 0;
        if (isBouncing) {
          yOffset = sin(frameCount * 0.1 + x * 0.02) * 15;
        }
        
        text(txt, x, y + yOffset);
        count++;
      }
    }
  }
}
