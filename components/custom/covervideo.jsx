import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react"

const MainVideo =
  "https://dkljmdqtvrkrnjdtdsjw.supabase.co/storage/v1/object/public/website-storage/stage-cut.mp4";

const staticImage = "/images/landscape.jpg";

//export default function CoverVideo()
export default function CoverVideo() {
  const [svgWidth, setSvgWidth] = useState("400");
  const [playCount, setPlayCount] = useState(0);
  const [showImage, setShowImage] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const videoRef = useRef(null);

  const MAX_PLAYS = 1

  function getSvgWidth() {
    return window.innerWidth < 600 ? "70vw" : "400";
  }

  function handleVideoEnd() {
    setPlayCount((prevCount) => {
      const newCount = prevCount + 1;
      if (newCount >= MAX_PLAYS) {
        setFadingOut(true);
        setTimeout(() => {
          setShowImage(true)
          setFadingOut(false)  
        }, 1000);
      }
      else {
        videoRef.current?.play();
      }
      return newCount;
    });
  }

  useEffect(() => {
    const handleResize = () => {
      setSvgWidth(getSvgWidth());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.section 
    // bg-white dark:bg-black 
      className={`relative w-full`}
      // style={{ backgroundImage: `url(${staticImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
      animate={{ height: showImage ? "auto" : "100vh"}}
      initial={{ height: "100vh" }}
      transition={{ duration: 1}}
    >
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${staticImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: showImage ? 1 : 0 }}
        transition={{ duration: 1 }}
      />
      <motion.video
        ref={videoRef}
        src={MainVideo}
        className={`absolute inset-0 w-full h-screen object-cover`}
        type="video/mp4"
        autoPlay
        muted
        onEnded={handleVideoEnd}
        animate={{ opacity: fadingOut || showImage ? 0 : 1 }}
        transition={{ duration: 1 }}
      />
      <div className={`inset-0 z-20 flex flex-col justify-center items-center text-white text-center ${showImage ? 'relative py-40' : 'absolute top-0 left-0'}`}>
        <div>
          <svg
            width={svgWidth}
            viewBox="0 0 690 289"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_8028_52)">
              <path
                d="M256.433 149.321C274.26 149.321 287.318 156.816 287.318 168.135C287.318 175.63 281.452 180.23 274.234 180.23C270.256 180.23 266.456 178.706 264.185 175.993C268.726 175.423 271.2 171.004 271.2 165.81C271.2 157.747 265.691 152.552 255.081 152.552C244.471 152.552 236.514 158.703 236.514 167.722C236.514 175.01 241.053 178.861 253.755 185.968C271.76 195.943 279.539 202.482 279.539 215.351C279.539 233.985 260.207 247.63 237.075 247.63C215.856 247.63 201.625 238.404 201.625 226.128C201.625 218.065 208.077 213.44 215.83 213.44C220.013 213.44 223.992 214.783 226.644 217.471C221.901 217.651 218.686 221.89 218.686 227.834C218.686 237.448 226.261 244.348 238.197 244.348C250.134 244.348 259.06 238.016 259.06 228.222C259.06 221.115 254.138 215.921 241.232 209.201C226.261 201.318 216.978 193.824 216.978 180.593C216.978 163.122 234.805 149.296 256.407 149.296L256.433 149.321Z"
                fill="#CCCCCC"
              />
              <path
                d="M288.286 288.178H261.559L290.174 171.599C291.117 167.955 291.5 165.655 291.5 163.535C291.5 158.16 288.669 155.085 283.721 151.622V151.234H321.824L315.958 175.812C323.354 161.985 335.673 149.296 352.352 149.296C371.123 149.296 381.172 163.122 381.172 184.055C381.172 216.334 359.953 247.63 329.603 247.63C315.015 247.63 304.966 238.223 303.436 226.697L288.26 288.152L288.286 288.178ZM340.034 161.235C327.716 161.235 316.163 174.106 312.159 191.576L307.414 210.002C306.267 214.421 305.91 218.272 305.91 221.709C305.91 233.623 312.362 239.774 321.085 239.774C340.239 239.774 353.883 207.314 353.883 182.143C353.883 169.661 349.7 161.209 340.034 161.209V161.235Z"
                fill="#CCCCCC"
              />
              <path
                d="M459.061 227.291C456.409 238.042 464.927 241.324 476.505 235.561L476.684 235.949C468.906 244.219 460.183 247.656 451.282 247.656C439.142 247.656 432.128 240.368 432.511 228.842C432.511 227.11 432.893 224.423 433.837 221.916C426.262 235.742 415.832 247.449 398.769 247.449C381.707 247.449 369.949 234.191 369.949 213.827C369.949 180.98 394.025 149.296 425.115 149.296C440.086 149.296 448.043 157.928 451.282 168.316C457.913 158.341 467.962 152.19 479.158 149.296C475.179 160.822 471.583 175.423 468.727 186.743L459.061 227.265V227.291ZM437.459 205.402L442.763 185.245C443.912 180.256 444.651 176.018 444.651 172.374C444.651 161.235 438.403 155.86 430.624 155.86C411.674 155.86 397.264 191.395 397.264 215.792C397.264 228.842 401.804 236.156 411.113 236.156C422.666 236.156 433.098 221.942 437.459 205.428V205.402Z"
                fill="#CCCCCC"
              />
              <path
                d="M552.125 170.436C552.125 181.393 543.606 189.25 532.792 189.25C526.544 189.25 519.913 185.994 518.944 178.887C520.271 179.662 522.362 180.23 523.866 180.23C531.645 180.23 536.007 173.304 536.007 165.06C536.007 157.773 532.589 152.966 525.575 152.966C508.513 152.966 492.598 183.124 492.598 208.658C492.598 228.067 502.264 236.517 515.144 236.517C526.519 236.517 534.654 231.529 542.815 220.778H543.963C535.802 238.249 521.418 247.656 503.591 247.656C481.606 247.656 465.691 232.874 465.691 209.045C465.691 177.93 491.273 149.321 525.014 149.321C540.367 149.321 552.125 157.203 552.125 170.461V170.436Z"
                fill="#CCCCCC"
              />
              <path
                d="M536.594 209.615C536.594 178.499 562.379 149.296 596.502 149.296C613.947 149.296 625.323 157.928 625.323 170.229C625.323 191.55 599.538 200.001 564.087 200.776C563.704 203.851 563.526 206.927 563.526 209.795C563.526 228.222 573.37 236.311 587.041 236.311C598.594 236.311 607.52 231.116 616.039 220.753H616.983C608.822 238.042 594.054 247.63 574.9 247.63C552.356 247.63 536.62 233.029 536.62 209.589L536.594 209.615ZM564.444 198.476C588.903 196.176 604.817 182.737 604.817 162.76C604.817 156.816 602.165 152.785 596.86 152.785C582.654 152.785 568.245 176.018 564.444 198.502V198.476Z"
                fill="#CCCCCC"
              />
              <path
                d="M658.655 149.321C676.483 149.321 689.541 156.816 689.541 168.135C689.541 175.63 683.675 180.23 676.458 180.23C672.479 180.23 668.678 178.706 666.409 175.993C670.949 175.423 673.423 171.004 673.423 165.81C673.423 157.747 667.913 152.552 657.304 152.552C646.695 152.552 638.738 158.703 638.738 167.722C638.738 175.01 643.277 178.861 655.978 185.968C673.984 195.943 681.763 202.482 681.763 215.351C681.763 233.985 662.431 247.63 639.298 247.63C618.079 247.63 603.848 238.404 603.848 226.128C603.848 218.065 610.3 213.44 618.054 213.44C622.236 213.44 626.215 214.783 628.867 217.471C624.123 217.651 620.91 221.89 620.91 227.834C620.91 237.448 628.485 244.348 640.446 244.348C652.407 244.348 661.308 238.016 661.308 228.222C661.308 221.115 656.386 215.921 643.481 209.201C628.51 201.318 619.227 193.824 619.227 180.593C619.227 163.122 637.054 149.296 658.655 149.296V149.321Z"
                fill="#CCCCCC"
              />
              <path
                d="M26.9324 126.607C26.5499 127.951 26.371 129.114 26.371 130.251C26.371 135.058 29.4064 137.746 34.1496 137.746C37.1849 137.746 40.6028 136.789 44.3773 134.877L44.5552 135.265C36.5987 143.534 28.0541 146.972 19.1538 146.972C6.83468 146.972 0 139.865 0 129.682C0 127.563 0.382502 125.444 0.943863 123.144L13.8234 70.8881C14.7673 67.2447 15.1498 64.9446 15.1498 62.8254C15.1498 57.4502 12.497 54.3742 7.37122 50.9116V50.5241H45.4742L26.9066 126.581L26.9324 126.607ZM38.4855 3.66986C47.5905 3.66986 53.6601 10.2085 53.6601 18.6587C53.6601 27.8849 46.2641 35.3793 36.8024 35.3793C27.3407 35.3793 21.6278 29.0483 21.6278 20.5971C21.6278 11.1901 29.0238 3.69569 38.4855 3.69569V3.66986Z"
                fill="#CCCCCC"
              />
              <path
                d="M59.7326 145.033H33.0039L51.2139 70.8881C52.1577 67.2447 52.5403 64.9446 52.5403 62.8254C52.5403 57.4502 49.7096 54.3741 44.7617 50.9116V50.5241H82.8647L75.4686 81.0711C84.3689 62.4379 98.7785 48.6115 116.02 48.6115C130.047 48.6115 135.913 57.631 135.913 69.5448C135.913 72.8007 135.53 76.6517 134.586 80.5028L123.212 126.607C122.83 127.951 122.651 129.114 122.651 130.251C122.651 135.058 125.686 137.746 130.429 137.746C133.465 137.746 136.882 136.789 140.657 134.877L140.835 135.265C132.877 143.534 124.334 146.972 115.434 146.972C103.114 146.972 96.2797 139.684 96.2797 129.501C96.2797 127.59 96.4585 125.47 97.0447 123.17L107.859 80.3468C108.624 77.0909 109.006 74.0158 109.006 71.5091C109.006 66.3137 107.118 62.877 100.666 62.877C90.8221 62.877 76.9729 74.4033 70.9032 99.7559L59.7068 145.085L59.7326 145.033Z"
                fill="#CCCCCC"
              />
              <path
                d="M176.87 50.5499H199.416L197.325 55.5376H175.902L155.244 141.002C146.904 175.193 130.403 187.856 105.383 188.631V188.243C117.141 182.868 123.949 162.891 131.728 128.881L148.408 55.5118H136.472L137.034 53.5992L149.734 49.5673L151.826 42.0729C160.548 13.6452 175.697 -0.000366211 199.978 -0.000366211C215.331 -0.000366211 225.761 6.33158 225.761 17.0819C225.761 27.2649 216.861 32.4592 207.934 32.4592C202.629 32.4592 198.09 30.5466 196.381 28.0399C204.159 26.6966 208.139 19.9771 208.139 12.8702C208.139 6.71907 205.307 3.07569 199.62 3.07569C189.955 3.07569 184.828 12.0942 179.523 38.2228L176.87 50.5241V50.5499Z"
                fill="#CCCCCC"
              />
              <path
                d="M199.034 126.607C198.651 127.951 198.473 129.114 198.473 130.251C198.473 135.058 201.508 137.746 206.251 137.746C209.287 137.746 212.703 136.789 216.478 134.877L216.657 135.265C208.699 143.534 200.156 146.972 191.255 146.972C178.936 146.972 172.102 139.865 172.102 129.682C172.102 127.563 172.484 125.444 173.045 123.144L185.925 70.8881C186.868 67.2447 187.25 64.9446 187.25 62.8254C187.25 57.4502 184.599 54.3742 179.472 50.9116V50.5241H217.575L199.008 126.581L199.034 126.607ZM210.613 3.66986C219.718 3.66986 225.788 10.2085 225.788 18.6587C225.788 27.8849 218.391 35.3793 208.929 35.3793C199.467 35.3793 193.754 29.0483 193.754 20.5971C193.754 11.1901 201.15 3.69569 210.613 3.69569V3.66986Z"
                fill="#CCCCCC"
              />
              <path
                d="M231.829 145.033H205.102L223.312 70.8881C224.255 67.2447 224.638 64.9446 224.638 62.8254C224.638 57.4502 221.806 54.3741 216.859 50.9116V50.5241H254.962L247.565 81.0711C256.467 62.4379 270.876 48.6115 288.117 48.6115C302.144 48.6115 308.01 57.631 308.01 69.5448C308.01 72.8007 307.628 76.6517 306.684 80.5028L295.31 126.607C294.926 127.951 294.748 129.114 294.748 130.251C294.748 135.058 297.783 137.746 302.527 137.746C305.562 137.746 308.979 136.789 312.754 134.877L312.933 135.265C304.975 143.534 296.431 146.972 287.53 146.972C275.212 146.972 268.377 139.684 268.377 129.501C268.377 127.59 268.555 125.47 269.142 123.17L279.956 80.3468C280.721 77.0909 281.104 74.0158 281.104 71.5091C281.104 66.3137 279.216 62.877 272.764 62.877C262.919 62.877 249.071 74.4033 243.001 99.7559L231.804 145.085L231.829 145.033Z"
                fill="#CCCCCC"
              />
              <path
                d="M330.405 126.607C330.023 127.951 329.844 129.114 329.844 130.251C329.844 135.058 332.879 137.746 337.622 137.746C340.658 137.746 344.074 136.789 347.849 134.877L348.028 135.265C340.07 143.534 331.527 146.972 322.626 146.972C310.307 146.972 303.473 139.865 303.473 129.682C303.473 127.563 303.855 125.444 304.417 123.144L317.296 70.8881C318.239 67.2447 318.621 64.9446 318.621 62.8254C318.621 57.4502 315.97 54.3742 310.843 50.9116V50.5241H348.946L330.379 126.581L330.405 126.607ZM341.958 3.66986C351.063 3.66986 357.133 10.2085 357.133 18.6587C357.133 27.8849 349.737 35.3793 340.275 35.3793C330.812 35.3793 325.099 29.0483 325.099 20.5971C325.099 11.1901 332.496 3.69569 341.958 3.69569V3.66986Z"
                fill="#CCCCCC"
              />
              <path
                d="M367.359 123.919C367.18 125.082 366.976 126.219 366.976 127.175C366.976 133.326 371.337 136.582 377.407 136.582C382.534 136.582 389.164 133.895 394.852 128.132L395.234 128.519C386.512 140.614 376.285 146.946 361.875 146.946C347.466 146.946 340.273 139.27 340.273 128.313C340.273 126.4 340.451 124.074 341.038 121.981L357.336 55.5376H345.961L346.343 53.625C366.44 48.6373 381.207 36.7236 392.021 17.3154H393.525L385.185 50.5499H409.823L407.731 55.5376H384.038L367.359 123.919Z"
                fill="#CCCCCC"
              />
              <path
                d="M384.602 108.93C384.602 77.8142 410.386 48.6115 444.485 48.6115C461.929 48.6115 473.304 57.2435 473.304 69.5448C473.304 90.8656 447.52 99.3168 412.069 100.092C411.687 103.167 411.508 106.242 411.508 109.111C411.508 127.538 421.353 135.626 435.023 135.626C446.576 135.626 455.503 130.432 464.021 120.068H464.965C456.803 137.358 442.036 146.946 422.883 146.946C400.338 146.946 384.602 132.345 384.602 108.905V108.93ZM412.477 97.7917C436.935 95.4916 452.85 82.0527 452.85 62.0762C452.85 56.1318 450.198 52.1009 444.893 52.1009C430.687 52.1009 416.277 75.3333 412.477 97.8175V97.7917Z"
                fill="#CCCCCC"
              />
            </g>
            <defs>
              <clipPath id="clip0_8028_52">
                <rect width="690" height="289" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>

        <div className="text-white text-xl mt-4">
          A Spatial Entertainment Company
        </div>
      </div>
      
    </motion.section>
  )
}
  