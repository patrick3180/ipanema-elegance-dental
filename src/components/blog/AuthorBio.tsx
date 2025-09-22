import React from 'react';
import { User, MapPin, Phone, ExternalLink } from 'lucide-react';

interface AuthorBioProps {
  bio: string;
  author: string;
  className?: string;
}

const AuthorBio: React.FC<AuthorBioProps> = ({ bio, author, className = '' }) => {
  if (!bio) return null;

  const parseAuthorBio = (bioText: string) => {
    const croMatch = bioText.match(/CRO[^0-9]*([0-9.-]+)/);
    const cro = croMatch ? croMatch[1] : null;
    
    const locationMatch = bioText.match(/📍\s*([^📞🔗\n]+)/);
    const location = locationMatch ? locationMatch[1].trim() : null;
    
    const phoneMatch = bioText.match(/📞\s*([^📍🔗\n]+)/);
    const phone = phoneMatch ? phoneMatch[1].trim() : null;
    
    const socialMatch = bioText.match(/🔗\s*\[([^\]]+)\]\(([^)]+)\)/);
    const socialLink = socialMatch ? { text: socialMatch[1], url: socialMatch[2] } : null;
    
    let mainBio = bioText
      .replace(/__(.*?)__/g, '')
      .replace(/📍.*$/m, '')
      .replace(/📞.*$/m, '')
      .replace(/🔗.*$/m, '')
      .trim();
    
    return { mainBio, cro, location, phone, socialLink };
  };

  const { mainBio, cro, location, phone, socialLink } = parseAuthorBio(bio);

  return (
    <div className={`mb-8 ${className}`}>
      <div className="bg-gradient-to-r from-dental-purple/5 to-dental-gold/5 rounded-xl p-6 border border-dental-gray/10">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="flex-shrink-0">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-dental-purple to-dental-gold p-0.5">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <User className="w-12 h-12 text-dental-purple" />
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-3">
              <h3 className="text-xl font-semibold text-dental-purple">
                {author}
              </h3>
              {cro && (
                <span className="text-sm text-dental-gray">CRO-RJ {cro}</span>
              )}
            </div>

            <p className="text-dental-gray/90 mb-4 leading-relaxed">
              {mainBio}
            </p>

            <div className="flex flex-wrap gap-4 text-sm">
              {location && (
                <div className="flex items-center text-dental-gray">
                  <MapPin className="w-4 h-4 mr-1 text-dental-gold" />
                  <span>{location}</span>
                </div>
              )}
              
              {phone && (
                <div className="flex items-center text-dental-gray">
                  <Phone className="w-4 h-4 mr-1 text-dental-gold" />
                  <a 
                    href={`tel:${phone.replace(/\D/g, '')}`}
                    className="hover:text-dental-purple transition-colors"
                  >
                    {phone}
                  </a>
                </div>
              )}
              
              {socialLink && (
                <div className="flex items-center text-dental-gray">
                  <ExternalLink className="w-4 h-4 mr-1 text-dental-gold" />
                  <a 
                    href={socialLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-dental-purple transition-colors"
                  >
                    {socialLink.text}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorBio;