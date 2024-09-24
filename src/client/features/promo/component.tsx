import { use, useMemo, useRef, useEffect, useCallback } from "react";
import { ServiceProvider } from "root/core/providers.js";

export const CMSTextMarks = {
  bold: ({ mark, children }) => <strong>{children}</strong>,
  link: ({ mark, children }) => <a {...mark.attrs}>{children}</a>,
  underline: ({ mark, children }) => <u>{children}</u>,
};

export const CMSContent = ({ node }) => {
  const data = node.attrs.data;
  const ContentType = CMSComponents[data.contentType];
  return <ContentType node={node} />;
};

export const CMSImage = ({ node }) => {
  const system = use(ServiceProvider);
  const cdn_src = `${system.endpoints.cms.site}.${node.attrs.src}`;
  const [cdn_path, cdn_query] = cdn_src.split("?");
  const query = cdn_query ? `?${cdn_query}` : "";
  const src = `${cdn_path}/webp/80q/${query}`;
  const { alt, title } = node.attrs;
  return <img {...{ alt, title, src }} />;
};


export const CMSProduct = ({ node }) => {
  const system = use(ServiceProvider);
  const site = system.endpoints.cms.site;

  const data = node.attrs.data;
  const sources = useMemo(() => build_image_list(data, site), [data]);

  return (
    <section className="advertised-product">
      <div className="ad-slot-1">
        <CrossfadingImageDisplay images={sources} duration={4000} />
      </div>
      <div className="ad-slot-2">
        <h2>{data.title}</h2>
        <div className="product-description">
          <HTMLContent html={data.description} />
        </div>
      </div>
      <div className="ad-slot-3">
        <button>${data.retailPrice}</button>
      </div>
    </section>
  );
};

const CMSActivity = ({ node }) => {
  const data = node.attrs.data;
  const system = use(ServiceProvider);
  const src = `${system.endpoints.cms.site}./dA/${data.image}/240w/webp/20q`;
  
  return (
    <div className="advertised-activity">
      <div className="slot-1">
        <img src={src} width={240} height={240} />
      </div>
      <div className="slot-2">
        <h2>{data.title}</h2>
        <HTMLContent html={data.description} />
      </div>
      <div className="slot-3">
        <a className="link" href={`${system.endpoints.cms.site}./activities/${data.urlTitle}`}>Learn More</a>
      </div>
    </div>
  );
};

const build_image_list = (data, root) => {
  const asset_base_url = `${root}dA/${data.identifier}`;
  return Array(10).fill(0)
    .map((_, i) => {
      const key = `image${i || ""}`;
      return key in data
        ? `${asset_base_url}/${key}`
        : "";
    }).filter(Boolean);
};

const load_image = (src, width, height) => {
  const image = new Image();
  image.src = src;
  return image.decode().then(() => image);
};


const load_sized_image = (width, height) => (src) =>
  load_image(`${src}/${width}w/webp/20q`, width, height);

const CrossfadingImageDisplay = ({ images: sources, duration = 4000 }: { images: string[], duration: number }) => {
  const div_ref = useRef<HTMLDivElement>(null);
  const image_ref = useRef<HTMLImageElement[]>(null);

  const initialize_images = useCallback((images) => {
    images.forEach((image, i) => (image.hidden = i > 0));
    image_ref.current = images;
    div_ref.current.replaceChildren(...images);
  }, []);

  useEffect(() => {
    const pending_images = sources.map(load_sized_image(120, 120));
    Promise.all(pending_images).then(initialize_images);
  }, [sources]);

  useEffect(() => {
    let index = 0;

    const interval_id = setInterval(() => {
      const length = image_ref.current?.length ?? 0;
      if (length < 2) return;

      const i = index % length;
      const j = (index + 1) % length;

      const current = image_ref.current[i];
      const next = image_ref.current[j];
      current.hidden = true;
      next.hidden = false;
      index = j;
    }, duration);
    return () => clearInterval(interval_id);
  }, []);

  return <div className="crossfading-container" ref={div_ref}></div>;
};

const CMSDestination = ({ node }) => {
  console.log(node);
  console.log(node.attrs);
  console.log(node.attrs.data);
};

export const CMSComponents = {
  Image: CMSImage,
  Content: CMSContent,
  Product: CMSProduct,
  Destination: CMSDestination,
  Activity: CMSActivity,
};

const HTMLContent = ({ html }) => (
  <div dangerouslySetInnerHTML={{ __html: html }} />
);
