import {ArrowTopRightOnSquareIcon} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import Image from 'next/image';
import {FC, memo, MouseEvent, useCallback, useEffect, useRef, useState} from 'react';

import {isMobile} from '../../config';
import {portfolioItems, SectionId} from '../../data/data';
import {PortfolioItem} from '../../data/dataDef';
import useDetectOutsideClick from '../../hooks/useDetectOutsideClick';
import Section from '../Layout/Section';

const Portfolio: FC = memo(() => {
  return (
    <Section className="bg-neutral-800" sectionId={SectionId.Portfolio}>
    <div className="flex flex-col gap-y-8 justify-center items-start">
      <h2 className="self-start text-xl font-bold text-white">Check out some of my work</h2>
      <div className="w-full columns-2 md:columns-3 lg:columns-4 flex flex-wrap justify-center items-stretch space-x-4 space-y-4"> {/* Changed items-start to items-stretch */}
        {portfolioItems.map((item, index) => {
          const {title, image} = item;
          return (
            <div className="pb-6 max-w-sm flex flex-col" key={`${title}-${index}`}> {/* Added flex and flex-col classes */}
              <div
                className={classNames(
                  'relative h-full w-full overflow-hidden rounded-lg shadow-lg shadow-black/30 lg:shadow-xl',
                  'hover:shadow-2xl hover:shadow-green-500 transition-shadow duration-500',
                )}>
                <Image alt={title} className="h-full w-full" placeholder="blur" src={image} />
                <ItemOverlay item={item} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </Section>
  );
});

Portfolio.displayName = 'Portfolio';
export default Portfolio;

const ItemOverlay: FC<{item: PortfolioItem}> = memo(({item: {url, title, description}}) => {
  const [mobile, setMobile] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // Avoid hydration styling errors by setting mobile in useEffect
    if (isMobile) {
      setMobile(true);
    }
  }, []);
  useDetectOutsideClick(linkRef, () => setShowOverlay(false));

  const handleItemClick = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      if (mobile && !showOverlay) {
        event.preventDefault();
        setShowOverlay(!showOverlay);
      }
    },
    [mobile, showOverlay],
  );

  return (
    <a
      className={classNames(
        'absolute inset-0 h-full w-full  bg-gray-900 transition-all duration-300',
        {'opacity-0 hover:opacity-80': !mobile},
        showOverlay ? 'opacity-80' : 'opacity-0',
      )}
      href={url}
      onClick={handleItemClick}
      ref={linkRef}
      target="_blank">
      <div className="relative h-full w-full p-4">
        <div className="flex h-full w-full flex-col gap-y-2 overflow-y-auto overscroll-contain">
          <h2 className="text-center font-bold text-white opacity-100">{title}</h2>
          <p className="text-xs text-white opacity-100 sm:text-sm">{description}</p>
        </div>
        <ArrowTopRightOnSquareIcon className="absolute bottom-1 right-1 h-4 w-4 shrink-0 text-white sm:bottom-2 sm:right-2" />
      </div>
    </a>
  );
});
<div className="flex flex-col gap-y-8 justify-center items-center"> {/* Added items-center class */}
  <h2 className="self-center text-xl font-bold text-white">Check out some of my work</h2>
  <div className=" w-full columns-2 md:columns-3 lg:columns-4">
    {/* Rest of the code */}
  </div>
</div>
