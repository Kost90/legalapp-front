const DocumentTemplateIllustration = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="140"
      height="180"
      viewBox="0 0 140 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      {...props}
    >
      {/* Документ */}
      <g stroke="#087dc1" strokeWidth="2">
        <path d="M20 20 H80 L110 50 V160 H20 Z" fill="#ffffff" />
        <path d="M80 20 V50 H110" fill="none" />
        <rect x="35" y="70" width="60" height="6" rx="3" fill="#dbe5ea" />
        <rect x="35" y="85" width="60" height="6" rx="3" fill="#dbe5ea" />
        <rect x="35" y="100" width="45" height="6" rx="3" fill="#FFDD00" />
      </g>

      {/* Шестерёнка — поднята, уменьшена и серая */}
      <g transform="translate(45, 135) scale(4) translate(-6, -14)" stroke="#94a3b8">
        <path d="m2.305 15.53.923-.382" />
        <path d="m3.228 12.852-.924-.383" />
        <path d="m4.852 11.228-.383-.923" />
        <path d="m4.852 16.772-.383.924" />
        <path d="m7.148 11.228.383-.923" />
        <path d="m7.53 17.696-.382-.924" />
        <path d="m8.772 12.852.923-.383" />
        <path d="m8.772 15.148.923.383" />
        <circle cx="6" cy="14" r="3" />
      </g>
    </svg>
  );
};

export default DocumentTemplateIllustration;
