import { ReactNode } from 'react';

export default function NewsSlugLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="news-detail-container py-5">
      {/* <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {children}
          </div>
        </div>
      </div> */}
                  {children}
    </div>
  );
} 