type LogoProps = {
  mobile: boolean
}

export default function Logo({mobile = false}: LogoProps) {

  let width = 187
  let height = 42

  if (mobile) {
    width = 136
    height = 32
  }

  return (
    <svg width={width} height={height} viewBox="0 0 187 51" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M41.9251 10.981L26.5898 0L0.000827518 35.0786L15.3361 46.0596L41.9251 10.981Z" fill="#CCCCCC" />
      <path d="M38.5857 48C45.4417 48 50.9995 42.598 50.9995 35.9344C50.9995 29.2707 45.4417 23.8687 38.5857 23.8687C31.7297 23.8687 26.1719 29.2707 26.1719 35.9344C26.1719 42.598 31.7297 48 38.5857 48Z" fill="#789BDE" />
      <g clipPath="url(#clip0_0_1)">
        <path d="M101.545 26.3508C105.059 26.3508 107.632 27.6734 107.632 29.671C107.632 30.9935 106.476 31.8053 105.054 31.8053C104.269 31.8053 103.52 31.5363 103.073 31.0575C103.968 30.957 104.456 30.1772 104.456 29.2605C104.456 27.8377 103.37 26.921 101.279 26.921C99.1872 26.921 97.6188 28.0063 97.6188 29.598C97.6188 30.8841 98.5136 31.5637 101.017 32.8179C104.566 34.5782 106.099 35.7321 106.099 38.0032C106.099 41.2914 102.289 43.6994 97.7295 43.6994C93.5471 43.6994 90.7422 42.0713 90.7422 39.905C90.7422 38.482 92.0139 37.6658 93.542 37.6658C94.3664 37.6658 95.1508 37.9029 95.6734 38.3772C94.7385 38.4091 94.105 39.1571 94.105 40.2061C94.105 41.9026 95.598 43.1203 97.9506 43.1203C100.303 43.1203 102.063 42.0029 102.063 40.2745C102.063 39.0203 101.092 38.1036 98.5488 36.9179C95.598 35.5268 93.7684 34.2042 93.7684 31.8693C93.7684 28.7862 97.282 26.3463 101.54 26.3463L101.545 26.3508Z" fill="#CCCCCC" />
        <path d="M107.823 50.855H102.555L108.195 30.2822C108.381 29.6391 108.456 29.2332 108.456 28.8592C108.456 27.9106 107.898 27.368 106.923 26.7567V26.6884H114.433L113.277 31.0256C114.735 28.5856 117.163 26.3463 120.45 26.3463C124.15 26.3463 126.131 28.7862 126.131 32.4803C126.131 38.1766 121.948 43.6994 115.966 43.6994C113.091 43.6994 111.11 42.0394 110.809 40.0053L107.818 50.8504L107.823 50.855ZM118.022 28.4533C115.594 28.4533 113.317 30.7245 112.528 33.8074L111.593 37.0592C111.367 37.8391 111.296 38.5187 111.296 39.1251C111.296 41.2276 112.568 42.3131 114.287 42.3131C118.063 42.3131 120.752 36.5849 120.752 32.1428C120.752 29.9401 119.928 28.4487 118.022 28.4487V28.4533Z" fill="#CCCCCC" />
        <path d="M141.482 40.1102C140.959 42.0075 142.638 42.5866 144.92 41.5697L144.956 41.638C143.422 43.0975 141.703 43.704 139.949 43.704C137.556 43.704 136.174 42.4179 136.249 40.3839C136.249 40.0783 136.324 39.604 136.51 39.1616C135.017 41.6016 132.961 43.6675 129.598 43.6675C126.235 43.6675 123.918 41.3279 123.918 37.7342C123.918 31.9377 128.663 26.3463 134.791 26.3463C137.742 26.3463 139.31 27.8696 139.949 29.7029C141.256 27.9425 143.236 26.857 145.443 26.3463C144.659 28.3803 143.95 30.957 143.387 32.9546L141.482 40.1056V40.1102ZM137.224 36.2474L138.27 32.6902C138.496 31.8099 138.642 31.0621 138.642 30.4189C138.642 28.4533 137.41 27.5047 135.877 27.5047C132.142 27.5047 129.302 33.7755 129.302 38.0809C129.302 40.3839 130.197 41.6745 132.031 41.6745C134.309 41.6745 136.365 39.1662 137.224 36.2519V36.2474Z" fill="#CCCCCC" />
        <path d="M159.825 30.0769C159.825 32.0106 158.146 33.397 156.015 33.397C154.783 33.397 153.476 32.8224 153.285 31.5682C153.547 31.705 153.959 31.8053 154.255 31.8053C155.789 31.8053 156.648 30.583 156.648 29.1283C156.648 27.8422 155.975 26.994 154.592 26.994C151.229 26.994 148.092 32.316 148.092 36.8219C148.092 40.2471 149.998 41.7383 152.536 41.7383C154.778 41.7383 156.382 40.8581 157.99 38.9608H158.217C156.608 42.0439 153.773 43.704 150.259 43.704C145.926 43.704 142.789 41.0954 142.789 36.8903C142.789 31.3994 147.831 26.3508 154.482 26.3508C157.508 26.3508 159.825 27.7418 159.825 30.0814V30.0769Z" fill="#CCCCCC" />
        <path d="M156.766 36.9908C156.766 31.4999 161.848 26.3463 168.574 26.3463C172.012 26.3463 174.254 27.8696 174.254 30.0404C174.254 33.8029 169.172 35.2943 162.184 35.431C162.109 35.9737 162.074 36.5165 162.074 37.0227C162.074 40.2745 164.014 41.7019 166.709 41.7019C168.986 41.7019 170.745 40.7852 172.424 38.9565H172.61C171.002 42.0075 168.091 43.6994 164.316 43.6994C159.872 43.6994 156.771 41.1227 156.771 36.9862L156.766 36.9908ZM162.255 35.0251C167.076 34.6192 170.212 32.2477 170.212 28.7224C170.212 27.6734 169.69 26.9621 168.644 26.9621C165.844 26.9621 163.004 31.0621 162.255 35.0297V35.0251Z" fill="#CCCCCC" />
        <path d="M180.822 26.3508C184.336 26.3508 186.91 27.6734 186.91 29.671C186.91 30.9935 185.754 31.8053 184.331 31.8053C183.547 31.8053 182.798 31.5363 182.35 31.0575C183.245 30.957 183.733 30.1772 183.733 29.2605C183.733 27.8377 182.647 26.921 180.556 26.921C178.465 26.921 176.896 28.0063 176.896 29.598C176.896 30.8841 177.791 31.5637 180.294 32.8179C183.844 34.5782 185.377 35.7321 185.377 38.0032C185.377 41.2914 181.566 43.6994 177.007 43.6994C172.825 43.6994 170.02 42.0713 170.02 39.905C170.02 38.482 171.291 37.6658 172.82 37.6658C173.644 37.6658 174.428 37.9029 174.951 38.3772C174.016 38.4091 173.383 39.1571 173.383 40.2061C173.383 41.9026 174.876 43.1203 177.233 43.1203C179.591 43.1203 181.345 42.0029 181.345 40.2745C181.345 39.0203 180.375 38.1036 177.831 36.9179C174.88 35.5268 173.051 34.2042 173.051 31.8693C173.051 28.7862 176.565 26.3463 180.822 26.3463V26.3508Z" fill="#CCCCCC" />
        <path d="M56.3084 22.3424C56.233 22.5796 56.1978 22.7848 56.1978 22.9855C56.1978 23.8338 56.796 24.3081 57.7309 24.3081C58.3292 24.3081 59.0029 24.1392 59.7468 23.8019L59.7819 23.8702C58.2137 25.3295 56.5295 25.9362 54.7752 25.9362C52.3471 25.9362 51 24.682 51 22.885C51 22.5111 51.0754 22.1372 51.186 21.7313L53.7246 12.5097C53.9106 11.8667 53.986 11.4608 53.986 11.0868C53.986 10.1383 53.4632 9.59543 52.4529 8.98439V8.91601H59.963L56.3033 22.3378L56.3084 22.3424ZM58.5855 0.647614C60.3802 0.647614 61.5765 1.80149 61.5765 3.2927C61.5765 4.92085 60.1187 6.2434 58.2538 6.2434C56.3889 6.2434 55.2629 5.12617 55.2629 3.63478C55.2629 1.97472 56.7206 0.652172 58.5855 0.652172V0.647614Z" fill="#CCCCCC" />
        <path d="M62.7722 25.5941H57.5039L61.0931 12.5097C61.2792 11.8667 61.3545 11.4608 61.3545 11.0868C61.3545 10.1383 60.7966 9.59543 59.8214 8.98439V8.91601H67.3315L65.8738 14.3066C67.628 11.0184 70.4682 8.57849 73.8664 8.57849C76.6312 8.57849 77.7874 10.1702 77.7874 12.2726C77.7874 12.8472 77.712 13.5268 77.526 14.2064L75.2841 22.3424C75.2087 22.5796 75.1734 22.7847 75.1734 22.9855C75.1734 23.8338 75.7717 24.308 76.7066 24.308C77.3049 24.308 77.9785 24.1392 78.7225 23.8019L78.7575 23.8702C77.1891 25.3295 75.5052 25.9362 73.7509 25.9362C71.3228 25.9362 69.9757 24.6501 69.9757 22.8531C69.9757 22.5158 70.0109 22.1418 70.1264 21.7359L72.2579 14.1788C72.4087 13.6043 72.4841 13.0616 72.4841 12.6192C72.4841 11.7024 72.112 11.0959 70.8403 11.0959C68.8999 11.0959 66.1702 13.13 64.9739 17.604L62.7671 25.6032L62.7722 25.5941Z" fill="#CCCCCC" />
        <path d="M85.8598 8.92058H90.3036L89.8914 9.80075H85.6689L81.5972 24.8826C79.9533 30.9164 76.701 33.151 71.7695 33.2878V33.2194C74.087 32.2709 75.429 28.7454 76.9622 22.7437L80.2498 9.7962H77.8973L78.008 9.45868L80.5113 8.74717L80.9235 7.42463C82.6427 2.40798 85.6286 -6.10352e-05 90.4143 -6.10352e-05C93.4405 -6.10352e-05 95.4963 1.11734 95.4963 3.01445C95.4963 4.81145 93.7421 5.7281 91.9825 5.7281C90.937 5.7281 90.0422 5.39058 89.7054 4.94821C91.2385 4.71116 92.0229 3.52538 92.0229 2.27121C92.0229 1.18572 91.4647 0.542772 90.3438 0.542772C88.4387 0.542772 87.4282 2.13428 86.3827 6.74521L85.8598 8.91602V8.92058Z" fill="#CCCCCC" />
        <path d="M90.2303 22.3424C90.1549 22.5796 90.1196 22.7848 90.1196 22.9855C90.1196 23.8338 90.7179 24.3081 91.6528 24.3081C92.2511 24.3081 92.9245 24.1392 93.6685 23.8019L93.7038 23.8702C92.1353 25.3295 90.4514 25.9362 88.6971 25.9362C86.269 25.9362 84.9219 24.682 84.9219 22.885C84.9219 22.5111 84.9973 22.1372 85.1079 21.7313L87.6465 12.5097C87.8323 11.8667 87.9077 11.4608 87.9077 11.0868C87.9077 10.1383 87.385 9.59543 86.3746 8.98439V8.91601H93.8847L90.2252 22.3378L90.2303 22.3424ZM92.5125 0.647614C94.3071 0.647614 95.5035 1.80149 95.5035 3.2927C95.5035 4.92085 94.0457 6.2434 92.1806 6.2434C90.3157 6.2434 89.1896 5.12617 89.1896 3.63478C89.1896 1.97472 90.6474 0.652172 92.5125 0.652172V0.647614Z" fill="#CCCCCC" />
        <path d="M96.6939 25.5941H91.4258L95.015 12.5097C95.201 11.8667 95.2764 11.4608 95.2764 11.0868C95.2764 10.1383 94.7183 9.59543 93.7433 8.98439V8.91601H101.253L99.7954 14.3066C101.55 11.0184 104.39 8.57849 107.788 8.57849C110.553 8.57849 111.709 10.1702 111.709 12.2726C111.709 12.8472 111.634 13.5268 111.448 14.2064L109.206 22.3424C109.13 22.5796 109.095 22.7847 109.095 22.9855C109.095 23.8338 109.693 24.308 110.628 24.308C111.227 24.308 111.9 24.1392 112.644 23.8019L112.679 23.8702C111.111 25.3295 109.427 25.9362 107.673 25.9362C105.245 25.9362 103.898 24.6501 103.898 22.8531C103.898 22.5158 103.933 22.1418 104.048 21.7359L106.18 14.1788C106.331 13.6043 106.406 13.0616 106.406 12.6192C106.406 11.7024 106.034 11.0959 104.762 11.0959C102.822 11.0959 100.092 13.13 98.8958 17.604L96.689 25.6032L96.6939 25.5941Z" fill="#CCCCCC" />
        <path d="M116.125 22.3424C116.049 22.5796 116.014 22.7848 116.014 22.9855C116.014 23.8338 116.612 24.3081 117.547 24.3081C118.146 24.3081 118.819 24.1392 119.563 23.8019L119.598 23.8702C118.03 25.3295 116.346 25.9362 114.591 25.9362C112.164 25.9362 110.816 24.682 110.816 22.885C110.816 22.5111 110.892 22.1372 111.002 21.7313L113.541 12.5097C113.727 11.8667 113.802 11.4608 113.802 11.0868C113.802 10.1383 113.28 9.59543 112.269 8.98439V8.91601H119.779L116.12 22.3378L116.125 22.3424ZM118.402 0.647614C120.197 0.647614 121.393 1.80149 121.393 3.2927C121.393 4.92085 119.935 6.2434 118.07 6.2434C116.205 6.2434 115.079 5.12617 115.079 3.63478C115.079 1.97472 116.537 0.652172 118.402 0.652172V0.647614Z" fill="#CCCCCC" />
        <path d="M123.409 21.8681C123.374 22.0733 123.333 22.274 123.333 22.4427C123.333 23.5282 124.193 24.1028 125.389 24.1028C126.4 24.1028 127.707 23.6285 128.828 22.6115L128.903 22.6799C127.184 24.8143 125.168 25.9317 122.328 25.9317C119.488 25.9317 118.07 24.577 118.07 22.6434C118.07 22.3059 118.105 21.8955 118.221 21.526L121.433 9.80076H119.191L119.267 9.46324C123.228 8.58307 126.138 6.48064 128.27 3.05566H128.566L126.923 8.92058H131.779L131.366 9.80076H126.696L123.409 21.8681Z" fill="#CCCCCC" />
        <path d="M126.805 19.223C126.805 13.7319 131.887 8.57849 138.608 8.57849C142.046 8.57849 144.288 10.1018 144.288 12.2726C144.288 16.0351 139.206 17.5265 132.219 17.6632C132.143 18.2059 132.108 18.7486 132.108 19.2549C132.108 22.5067 134.049 23.9341 136.743 23.9341C139.02 23.9341 140.779 23.0174 142.458 21.1885H142.644C141.036 24.2397 138.125 25.9316 134.35 25.9316C129.906 25.9316 126.805 23.3549 126.805 19.2185V19.223ZM132.299 17.2573C137.12 16.8514 140.257 14.4799 140.257 10.9546C140.257 9.90559 139.734 9.19426 138.688 9.19426C135.888 9.19426 133.048 13.2941 132.299 17.2619V17.2573Z" fill="#CCCCCC" />
      </g>
      <defs>
        <clipPath id="clip0_0_1">
          <rect width="136" height="51" fill="white" transform="translate(51)" />
        </clipPath>
      </defs>
    </svg>

  );
}
