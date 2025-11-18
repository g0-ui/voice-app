interface LinkItem {
  url: string;
  label: string;
}

interface RelatedLinksProps {
  links: LinkItem[];
}

const RelatedLinks = ({ links }: RelatedLinksProps) => {
  return (
    <div className="related-links-container">
      <h2 className="related-links-title">公式サイト</h2>

      <div className="related-links-list">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="related-link"
          >
            {link.label}
            <span className="related-link-arrow">↗</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default RelatedLinks;
