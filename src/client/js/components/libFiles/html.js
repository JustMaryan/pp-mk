const html = {
    title: `
	<div data-crib-item="title" class="items-chapter__element items-chapter__element_title">
		<div class="items-chapter__menu">
			<button data-btn="remove" type="button" class="items-chapter__btn items-chapter__btn_remove _icon-cross"></button>
		</div>
		<div contenteditable="true" data-edit data-crib-content="title" class="items-chapter__content"></div>
	</div>`,
	subtitle: `
	<div data-crib-item="subtitle" class="items-chapter__element items-chapter__element_subtitle">
		<div class="items-chapter__menu">
			<button data-btn="remove" type="button" class="items-chapter__btn items-chapter__btn_remove _icon-cross"></button>
		</div>
		<div contenteditable="true" data-edit data-crib-content class="items-chapter__content"></div>
	</div>`,
    text: `
    <div data-crib-item="text" class="items-chapter__element">
		<div class="items-chapter__menu">
			<button data-btn="popFontSetting" class="items-chapter__btn _icon-sort-size-up">Шрифт</button>
			<button data-btn="popColor" class="items-chapter__btn _icon-palette">Колір</button>
			<button data-btn="popColorBg" class="items-chapter__btn _icon-fill">Фон</button>
			<button data-btn="popTextSetting" class="items-chapter__btn _icon-settings-sliders">Стилі</button>
			<button data-btn="remove" type="button" class="items-chapter__btn items-chapter__btn_remove _icon-cross"></button>
		</div>
		<div contenteditable="true" data-edit data-crib-content class="items-chapter__content"></div>
	</div>`,
	warning: `
	<div data-crib-item="warning" class="items-chapter__element items-chapter__element_warning">
		<div class="items-chapter__menu">
			<button data-btn="popFontSetting" class="items-chapter__btn _icon-sort-size-up">Шрифт</button>
			<button data-btn="popColor" class="items-chapter__btn _icon-palette">Колір</button>
			<button data-btn="popColorBg" class="items-chapter__btn _icon-fill">Фон</button>
			<button data-btn="popTextSetting" class="items-chapter__btn _icon-settings-sliders">Стилі</button>
			<button data-btn="remove" type="button" class="items-chapter__btn items-chapter__btn_remove _icon-cross"></button>
		</div>
		<div contenteditable="true" data-edit data-crib-content class="items-chapter__content"></div>
	</div>`,
    important: `
	<div data-crib-item="important" class="items-chapter__element items-chapter__element_important">
		<div class="items-chapter__menu">
			<button data-btn="popFontSetting" class="items-chapter__btn _icon-sort-size-up">Шрифт</button>
			<button data-btn="popColor" class="items-chapter__btn _icon-palette">Колір</button>
			<button data-btn="popColorBg" class="items-chapter__btn _icon-fill">Фон</button>
			<button data-btn="popTextSetting" class="items-chapter__btn _icon-settings-sliders">Стилі</button>
			<button data-btn="remove" type="button" class="items-chapter__btn items-chapter__btn_remove _icon-cross"></button>
		</div>
		<div contenteditable="true" data-edit data-crib-content class="items-chapter__content"></div>
	</div>`,
    code: `<div data-crib-item="code" class="code">
				<div class="code__header">
					<h5 class="code__title">Code</h5>
					<div class="code__btns">
						<button data-btn="copyText" type="button" class="code__btn code__btn_copy _icon-copy-alt">Копіювати код</button>
						<button data-btn="remove" type="button" class="code__btn code__btn_remove _icon-cross"></button>
					</div>
				</div>
				<div class="code__body">
					<div data-edit data-crib-content class="code__redactor"></div>
				</div>
				<div class="code__footer">
					<p data-edit contenteditable="true" class="code__description"></p>
				</div>
			</div>`,
    chapter: `<div data-chapter class="chapter _edit-chapter">
						<h2 contenteditable="true" data-crib-content="main-title" class="chapter__title">Нова глава</h2>
						<div class="chapter__edit">
							<button data-btn="remove" type="button" class="chapter__btn chapter__btn_remove _icon-cross">Видалити</button>
							<button data-btn="edit" type="button" class="chapter__btn chapter__btn_edit _icon-file-edit">Редагувати</button>
						</div>
						<div data-crib-items class="chapter__content items-chapter"></div>	
						<div class="chapter__menu">
							<div class="chapter__left">
								<button data-btn="add-title" type="button" class="chapter__btn _icon-plus">Заголовок</button>
								<button data-btn="add-subtitle" type="button" class="chapter__btn _icon-plus">Підзаголовок</button>
								<button data-btn="add-text" type="button" class="chapter__btn _icon-plus">Текст</button>
								<button data-btn="add-important" type="button" class="chapter__btn _icon-plus">Важливо</button>
								<button data-btn="add-warning" type="button" class="chapter__btn _icon-plus">Попередження</button>
								<button data-btn="add-code" type="button" class="chapter__btn _icon-plus">Код</button>
								<label data-btn="order" class="chapter__btn chapter__order">
									<input data-order-check type="checkbox" class="chapter__order_check">
									<span class="chapter__order_indicator _icon-rotate-reverse"></span>
								</label>
							</div>
							<div class="chapter__right">
								<button data-btn="save" type="button" class="chapter__btn chapter__btn_save _icon-check">Зберегти</button>
								<button data-btn="clear" type="button" class="chapter__btn chapter__btn_clear _icon-plus">Очистити</button>
							</div>
						</div>
					</div>`,
    menu: `<div data-menu data-spollers class="menu__spoiler">
				<h2 data-spoller data-menu="title" class="menu__title _icon-angle-right">Найменування першої глави</h2>
				<ul data-menu="items" class="menu__list">
				</ul>
			</div>`,
	popTextEdit: `<div class="popup-menu">
					<div class="popup-menu__group">
						<button data-btn="bold" class="popup-menu__btn _icon-bold"></button>
						<button data-btn="italic" class="popup-menu__btn _icon-italic"></button>
						<button data-btn="createLink" class="popup-menu__btn _icon-link-alt"></button>
						<button data-btn="unlink" class="popup-menu__btn _icon-link-slash-alt"></button>
						<button data-btn="underline" class="popup-menu__btn _icon-underline"></button>
					</div>
					<div class="popup-menu__group">
						<button data-btn="justifyLeft" class="popup-menu__btn _icon-align-left"></button>
						<button data-btn="justifyCenter" class="popup-menu__btn _icon-align-center"></button>
						<button data-btn="justifyRight" class="popup-menu__btn _icon-symbol"></button>
						<button data-btn="justifyFull" class="popup-menu__btn _icon-align-justify"></button>
					</div>
					<div class="popup-menu__group">
						<button data-btn="indent" class="popup-menu__btn _icon-indent"></button>
						<button data-btn="outdent" class="popup-menu__btn _icon-outdent"></button>
						<button data-btn="insertOrderedList" class="popup-menu__btn _icon-list"></button>
					</div>
				</div>`,
	popColorEdit: `<div class="popup-menu">
					<div class="popup-menu__group">
						<button data-btn="white" class="popup-menu__btn popup-menu__btn_white"></button>
						<button data-btn="black" class="popup-menu__btn popup-menu__btn_black"></button>
					</div>
					<div class="popup-menu__group">
						<button data-btn="gray" class="popup-menu__btn popup-menu__btn_gray"></button>
						<button data-btn="blue" class="popup-menu__btn popup-menu__btn_blue"></button>
						<button data-btn="dark" class="popup-menu__btn popup-menu__btn_dark"></button>
						<button data-btn="yellow" class="popup-menu__btn popup-menu__btn_yellow"></button>
					</div>
				   </div>`,
	 popColorEditBg: `<div class="popup-menu">
					 <div class="popup-menu__group">
					   <button data-btn="whiteBg" class="popup-menu__btn popup-menu__btn_white"></button>
					   <button data-btn="blackBg" class="popup-menu__btn popup-menu__btn_black"></button>
					 </div>
					 <div class="popup-menu__group">
					   <button data-btn="grayBg" class="popup-menu__btn popup-menu__btn_gray"></button>
					   <button data-btn="blueBg" class="popup-menu__btn popup-menu__btn_blue"></button>
					   <button data-btn="darkBg" class="popup-menu__btn popup-menu__btn_dark"></button>
					   <button data-btn="yellowBg" class="popup-menu__btn popup-menu__btn_yellow"></button>
					 </div>
					</div>`,
	popFontEdit: `<div class="popup-menu">
				    	<div class="popup-menu__group">
				    	  <button data-btn="font-10" class="popup-menu__btn popup-menu__btn_text">10</button>
				    	  <button data-btn="font-16" class="popup-menu__btn popup-menu__btn_text">13</button>
						  <button data-btn="font-18" class="popup-menu__btn popup-menu__btn_text">16</button>
						  </div>
						<div class="popup-menu__group">
						  <button data-btn="font-18" class="popup-menu__btn popup-menu__btn_text">18</button>
				    	  <button data-btn="font-20" class="popup-menu__btn popup-menu__btn_text">24</button>
				    	  <button data-btn="font-22" class="popup-menu__btn popup-menu__btn_text">32</button>
				    	</div>
				    </div>`
					    
}

export default html