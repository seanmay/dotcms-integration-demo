import { useRef, use, useEffect, useState, useMemo } from "react";
import { ServiceProvider } from "root/core/providers.js";

export const Banner = ({ banners }) => {
  const system = use(ServiceProvider);
  const root = system.endpoints.cms.site;

  const wrapper_ref = useRef(null);

  let [index, set_index] = useState(0);
  let [images, set_images] = useState(null);
  let [ready, set_ready] = useState(false);

  const items = useMemo(() => (banners.contentlets ?? [])
    .filter(data => data.layout.toString() === "1"), [banners]);

  useEffect(() => {
    if (!ready) return;
    let handle = setInterval(() => set_index(index => (index + 1) % items.length), 4_000);
    return () => clearInterval(handle);
  }, [set_index, images, ready]);

  useEffect(() => {
    const loading = preload_images(root, items, set_images);
    Promise.all(loading).then(() => set_ready(true));
  }, [items]);

  return (
  <>
    <div ref={wrapper_ref} className="banner-outer-wrapper">
      {items.map((data, i) => <Layout1 key={data.title} data={data} image={images[i]} selected={i === index} />)}
    </div>
    <div className="banner-controller">
      <div className="banner-pips">
        <fieldset>
          {items.map((data, i) =>
            <input key={data.title}
              type="radio"
              name="banner"
              checked={index === i}
              onChange={() => set_index(() => i)}
            />)}
        </fieldset>
      </div>
    </div>
  </>
  );
};

const preload_images = (root, items, set_images) => {
  const images = items.map(data => {
    const img = new Image();
    const src = `${root}./dA/${data.image}/2000w/webp/50q`;
    img.src = src;
    return img;
  });

  set_images(images);
  return images.map(image => image.decode());
};

const Layout1 = ({ data, selected, image }) => {
  const system = use(ServiceProvider);
  const wrapper_ref = useRef(null);

  const root = system.endpoints.cms.site;
  const bg_image = `${root}./dA/${data.image}/2000w/webp/50q`;
  const cwd = import.meta.url + "/../";
  useEffect(() => {
    // wrapper_ref.current.style.setProperty("--bg-image", `url(${bg_image})`);
    if (!image) return;
    wrapper_ref.current.replaceChildren(image);
  }, [data, image]);

  return (
    <>
      <div className="banner-layout-1" hidden={!selected}>
        <div ref={wrapper_ref} className="banner-background-image"></div>
        <section className="banner-content">
          <h2 className="banner-title">{data.title}</h2>
          <p className="banner-tagline strikethrough-flourish">
            {data.caption}
          </p>
          <div>
            <button>What am I doing Here?</button>
          </div>
        </section>
      </div>
    </>
  );
};




// I FINALLY found the live example of a `Banner`, in the demo site. It turned out it was the full-width splash on the homepage, the whole time. I thought I was missing a major example., somewhere.
/*
const Banner_1_Item = ({ data }) => {
  return <div
    class="bg-image-full bg-overlay-30 context-dark"
    style={{ backgroundImage: `url('https://demo.dotcms.com/dA/${data.image}')` }}>
    <div class="container">
      <div class="row justify-content-lg-center">
        <div class="col-lg-9 text-center">
          <p class="banner-title"
            >{data.title}</p>
          <h2 class="text-decoration-lines-2">
            <span>
              $!{data.caption}
              <span class="text-decoration-line text-decoration-line-left"></span>
              <span class="text-decoration-line text-decoration-line-right"></span>
            </span>
          </h2>
#if($UtilMethods.isSet($link) && $UtilMethods.isSet($buttonText))
          <div class="group-lg">
            <a class="button button-primary button-leaf" href="$link">$buttonText</a>
          </div>
#end
        </div>
      </div>
    </div>
  </div>
};
*/