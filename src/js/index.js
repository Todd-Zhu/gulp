require(['js/module/util', 'js/module/applyTips', 'js/module/subNav'], function(util) {
	var $doc = $(document),
		$win = $(window),
		$ytList = $('.yt-list'),
	//$videoBox=$('#videoBox'),
		$useSaller = $('#useSaller'),
		$useSallerArrow = $('#useSallerArrow'),
		$useSallerLogo = $('#useSallerLogo'),
		$arrowUl = $useSallerArrow.find('ul'),
		$ul = $useSallerLogo.find('ul'),
		$prevBtn = $('.prev'),
		$nextBtn = $('.next'),
		$manageCover = $('.manage-cover'),
		$manageCoverMask = $('.manage-cover-mask'),
		$manageScoll = $('.manage-scoll'),
		$manageScollHightLight = $manageScoll.find('p'),
		$scollBtn = $manageScoll.find('span'),
		$best = $('.best'),
		x = 0,
		liW = 0,
		isSlide = 0,
		animated = 0,
		isMove,
		sIdx = 0,
		sdtimes = times = null,
		arrTmp = [];


	function isTransition() { //判断是否支持transition
		var thisBody = document.body || document.documentElement,
			thisStyle = thisBody.style,
			support = thisStyle.transition !== undefined || thisStyle.WebkitTransition !== undefined || thisStyle.MozTransition !== undefined || thisStyle.MsTransition !== undefined || thisStyle.OTransition !== undefined;
		return support;
	};

	function autoSetImageW() {
		var winW = $win.width(),
			imagesW = winW / 5,
			maxW = imagesW * $useSallerLogo.find('li').size();

		$ul.show().find('li').css({
			width: imagesW
		}).find('img').css({
			width: imagesW
		});
		$ul.find('td').css({
			'height': $ul.find('.use-mask-box').height()
		});
	}

	function slide(e) {
		var slideW = $useSallerLogo.find('li').eq(0).width(),
			dir = '';

		if ($(e.target).hasClass('prev') && !isSlide) {
			isSlide = 1;
			dir = '';
			// $ul.prepend($ul.find('li').eq(-1)).css({
			// 	'margin-left': -slideW
			// });
			slideNucleus(dir, slideW);
		}
		if ($(e.target).hasClass('next') && !isSlide) {

			isSlide = 1;
			dir = '-';
			slideNucleus(dir, slideW);
		}

	}

	function slideNucleus(dir, slideW) {
		var currentLi;
		// 向后翻页
		if(dir == "-"){
			currentLi=$ul.find('li').eq(1);
		}else{
			currentLi=$ul.find('li').eq(4);
		}
		var currentIndex=currentLi.attr('data');
		
		$useSaller.find('li').fadeOut(700);
		$useSallerArrow.find('li').fadeOut(700);

		$useSaller.find('li[data='+currentIndex+']').fadeIn(100);
		$useSallerArrow.find('li[data='+currentIndex+']').fadeIn(100);

		$ul.animate({
				'left': dir + slideW
			},
			800,
			function() {
				isSlide = 0;
				$(this).css({
					'left': 0
				});

				if (dir) {
					$(this).append($(this).find('li').eq(0));
				}else{
					$(this).prepend($(this).find('li').eq(4));
				}
				var currLi=$(this).find('li').eq(0).find('a');
				currLi.attr('class',currLi.attr('class').replace('-current',''));
				var prevLi=$(this).find('li').last().find('a');
				// 向后翻页
				if(dir == "-"){
					prevLi.attr('class',prevLi.attr('class') + '-current');
				}else{
					var nextLi = $(this).find('li').eq(1).find('a');
					nextLi.attr('class',nextLi.attr('class') + '-current');
				}
			});
	};

	function stopSlide() {
		clearInterval(sdtimes);
	}

	function initSlide() {
		// var currLi=$ul.find('li').eq(0);
		// currLi.find('img').attr('src','http://imgw2.keruyun.net/images/index-item-current-logo'+currLi.attr('data')+'.png');
		sdtimes = setInterval(function() {
			slideNucleus('-', $ul.find('li').width());
		}, 3000);
	}

	// $win.on('resize', autoSetImageW).resize();

	$.fn.resetImgWidth = function() {
		return $(this).each(function() {
			var $target = $(this),
				targetW = $target.width();

			function resizeWin() {
				var winProportion = ($win.height() / $win.width()) > 1 ? 1 : ($win.height() / $win.width());

				$target.css({
					'width': targetW * winProportion
				});
			}

			$win.on('resize', resizeWin).resize();

		});
	};


	if (isTransition()) {
		$(".dot").remove();// zhulf
		$('body, html').css({
			'height': '100%',
			// 'min-height': '955px', //zhulf
			// 'overflow': 'hidden',
			'padding-top': 0
		});

		$('.warper').css({
			'height': '100%'
		});

		$('.src').css({
			'margin-top': 80,
			// 'height': $win.height()-80, //zhulf
			// 'overflow': 'hidden'
		});

		// 设置固定高度 zhulf start
		$useSallerLogo.find('a').css({
			'default' : 'default'
		});
		$('.part-1').css({
			'height': 844
		});
		$('.part-2').css({
			'height': 600
		});
		$('.part-3').css({
			'height': 850
		}).find('.mid').css({
			'top': 0,
			'margin-top': '70px'
		});
		$('.part-4').css({
			'height': 600
		});
		$('.part-5').css({
			'height': 600
		});
		$('.best-txt').css({
			'margin-top': 70
		});
		$('.use-txt').css({
			'margin-bottom': 70
		});
		$win.on('scroll',function(){
	 		// 滚动条滑动距离
	        var scrollTop = this.document.documentElement.scrollTop || this.document.body.scrollTop;
	        // 滚动条的高度
	        var scrollHeight = this.document.documentElement.clientHeight || this.document.body.clientHeight;
		    // 显示高度
	        var viewTop = scrollTop + scrollHeight;
	        // 模块高度
	        var part2Top = $ytList.offset().top;
            var part4Top = $manageCover.offset().top;
            var part5Top = $best.offset().top;
            if(viewTop >= part5Top && !$best.hasClass('anim')){
            	$best.addClass('anim');
            }
            if(viewTop >= part4Top && !$manageCover.hasClass('anim')){
            	$manageCover.addClass('anim');
            }
	        if(viewTop >= part2Top && !$ytList.hasClass('anim')){
	            $ytList.addClass('anim');
	        }
		});

		// 设置固定高度 zhulf end

		// $('.dot').show(); //zhulf

		function manageCover(x) {
			$manageCoverMask.css({
				width: x,
				'animation': 'none'
			});
			$manageScollHightLight.css({
				width: x,
				'animation': 'none'
			});
		}
		// 注释过度事件 zhulf
		/*$('.warper').on('webkitTransitionEnd transitionend', function() {

			if (Math.abs(sIdx) == 1 && !$ytList.hasClass('anim')) {
				$ytList.addClass('anim');
			} else {
				$ytList.removeClass('anim');
			}

			if (Math.abs(sIdx) == 3 && !$manageCover.hasClass('anim')) {
				$manageCover.addClass('anim');
			} else {
				$manageCover.removeClass('anim');
			}

			if (Math.abs(sIdx) == 4 && !$best.hasClass('anim')) {
				$best.addClass('anim');
			} else if (Math.abs(sIdx) < 4) {
				$best.removeClass('anim');
			}
		});*/

		function animates(sIdx) {
			var target = $('.warper'),
				winH = $(this).height();

			arrTmp = [];
			if (Math.abs(sIdx) < 5) {
				$doc.find('.dot').fadeIn();
				target.css({
					'transform': 'translate3d(0, ' + winH * sIdx + 'px, 0)'
				});
			} else {
				target.css({
					'transform': 'translate3d(0, ' + (winH * (sIdx + 1) - 440) + 'px, 0)'
				});
			}

			$doc.find('.dot li').eq(Math.abs(sIdx)).addClass('cur').siblings().removeClass('cur');
		};

		// 注释鼠标滚轮事件，滚动后换显示区域 zhulf
		/*$('html,body').on('mousewheel', function() {
			var delta = window.event.detail ? -(window.event.detail || 0) / 3 : window.event.wheelDelta / 120;
			clearTimeout(times);
			times = setTimeout(function() {
				if (delta > 0 && sIdx <= 0) {
					sIdx++;
				} else if (delta < 0 && Math.abs(sIdx) < 5) {
					sIdx--;
				}
				sIdx > 0 ? sIdx = 0 : sIdx;
				animates(sIdx);

			}, 300);

		});*/

		$doc.find('.dot li').on('click', function() {
			var target = $(this);
			sIdx = -target.index();
			animates(sIdx);

		});

		$win.on('resize', function() {
			var target = $('.warper'),
				winH = $win.height();
			if (Math.abs(sIdx) < 5) {
				target.css({
					'transform': 'translate3d(0, ' + winH * sIdx + 'px, 0)'
				});
			} else {
				target.css({
					'transform': 'translate3d(0, ' + (winH * (sIdx + 1) - 440) + 'px, 0)'
				});
			}
			$('.src').css({
				'margin-top': 80,
				// 'height': $win.height() - 80, //zhulf
				// 'overflow': 'hidden'
			});
		}).resize();
	} else {
		$manageScoll.hide();
		$('.part-5').find('li').css({
			'opacity': 1
		}).css({
			'transform': 'translatey(0)'
		});
		$('.yt-list').find('li').children('.img-2').hide();
		$('.manage-cover-mask').css('width', '100%');
	}

	$("#codeImg").on('click',function(){
		var src=$(this).attr("src");
		src=src.substring(0,src.indexOf("html")+4);
		$(this).attr("src",src+"?rd="+new Date().getTime());
	});

	$manageScoll.find('span').on('mousedown', function(e) {
		isMove = 1;

		e.stopPropagation;
		$doc.on('mouseup', function() {
			isMove = 0;
		});
		$doc.on('mousemove', function(e) {
			var x = e.pageX - ($win.width() - 1000) / 2;
			if (isMove && x <= $manageScoll.width() && x >= 0) {
				manageCover(x);
			}
		});
	});

	window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();

	$prevBtn.on('click', slide);
	$nextBtn.on('click', slide);

	// 启动鼠标覆盖时事件
	function onMouseenter(){
		$useSaller.on('mouseenter', stopSlide).on('mouseleave', initSlide).trigger('mouseleave');
	}
	// 移除鼠标覆盖时事件
	function offMouseenter(){
		$useSaller.off('mouseenter').off('mouseleave');
	}
	onMouseenter();

	//设置播放视频
	$('.part-bg .play,.use-saller .play').on('click',function(){
		var videoName=$(this).attr('data');
		//$('#video source').attr('src','videos/'+videoName+'.mp4');
		var oldVideoName = $('#video source').attr('src');
		if (videoName == oldVideoName) {
			document.getElementById('video').play();
		} else {
			$('#video source').attr('src',videoName);
			document.getElementById('video').load();
			document.getElementById('video').play();
		}
		offMouseenter();
		stopSlide();
		$('.mask-layer').show();
		$('#videoBox').show();
	});

	$('#videoClose').on('click',function(){
		$('.mask-layer').hide();
		$('#videoBox').hide();

		document.getElementById('video').pause();     
		onMouseenter();
	});

	$(".banner-content img").css({
		"opacity" : 1
	});
});
