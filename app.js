const $ = (s, root=document) => root.querySelector(s);
const modal = $('#modalBackdrop'), toast = $('#toast');
let pendingAction = null, selectedMode = 'classic', toastTimer;
const modeNames = {classic:'بازی کلاسیک', survival:'آخرین بازمانده', secret:'نقاش مخفی'};
function showToast(message){
  toast.textContent = message; toast.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(()=>toast.classList.remove('show'),2600);
}
function openModal(action, mode='classic'){
  pendingAction = action; selectedMode = mode;
  $('#modalEmoji').textContent = mode==='secret'?'🕵️':mode==='survival'?'❤️':'🎨';
  $('#modalTitle').textContent = action==='create'?'ساخت اتاق خصوصی':action==='join'?'ورود به اتاق':`شروع ${modeNames[mode]}`;
  $('#modalText').textContent = action==='create'?'اسم بازیکنت رو وارد کن تا اتاق اختصاصی ساخته بشه.':action==='join'?'برای ورود به این اتاق، اسمت رو بنویس.':'یه اسم باحال انتخاب کن و آماده شو!';
  $('#modalConfirm').textContent = action==='create'?'ساخت اتاق':action==='join'?'ورود به اتاق':'بزن بریم!';
  modal.hidden = false; setTimeout(()=>$('#playerName').focus(),80);
}
function closeModal(){modal.hidden=true}
$('#quickPlay').addEventListener('click',()=>openModal('play','classic'));
$('#createRoom').addEventListener('click',()=>openModal('create'));
document.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>openModal('play',b.dataset.mode)));
document.querySelectorAll('[data-join]').forEach(b=>b.addEventListener('click',()=>openModal('join')));
$('#modalClose').addEventListener('click',closeModal); $('#modalCancel').addEventListener('click',closeModal);
modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});
$('#modalConfirm').addEventListener('click',()=>{
  const name=$('#playerName').value.trim();
  if(!name){$('#playerName').focus();showToast('اول یه اسم برای بازیکنت بنویس 🙂');return}
  closeModal();
  if(pendingAction==='create') showToast(`اتاق خصوصی برای «${name}» آماده شد؛ اتصال سرور در مرحله بعد اضافه می‌شه.`);
  else if(pendingAction==='join') showToast(`درخواست ورود «${name}» ثبت شد؛ بخش آنلاین در مرحله بعد فعال می‌شه.`);
  else showToast(`${name}، حالت ${modeNames[selectedMode]} انتخاب شد؛ این پیش‌نمایش فعلاً آفلاینه.`);
});
$('#playerName').addEventListener('keydown',e=>{if(e.key==='Enter')$('#modalConfirm').click()});
document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('.nav-link').forEach(n=>n.classList.remove('active'));
  if(b.classList.contains('nav-link')) b.classList.add('active');
  showToast(b.dataset.view==='ranking'?'جدول کامل امتیازات در مرحله بعد تکمیل می‌شه.':b.dataset.view==='shop'?'فروشگاه در مرحله بعد طراحی می‌شه.':'به صفحه خانه برگشتی.');
}));
$('#allRooms').addEventListener('click',()=>showToast('فهرست اتاق‌های عمومی در نسخه بعد اضافه می‌شه.'));
$('#profileBtn').addEventListener('click',()=>showToast('پروفایل و ورود کاربری در مرحله بک‌اند پیاده‌سازی می‌شه.'));
