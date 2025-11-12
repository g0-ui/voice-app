import { VStack, Text, Link, useColorModeValue } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

interface LinkItem {
  url: string;
  label: string;
}

interface RelatedLinksProps {
  links: LinkItem[];
}

const RelatedLinks = ({ links }: RelatedLinksProps) => {
  const bgGradient = useColorModeValue(
    'linear-gradient(135deg, #ff6b9d 0%, #ffc3e0 100%)',
    'linear-gradient(135deg, #e6005f 0%, #ff6b9d 100%)'
  );

  return (
    <VStack gap={3} align="stretch" width="100%">
      <Text fontSize="xl" fontWeight="semibold" color="pink.500" mb={2}>
        関連リンク
      </Text>

      <VStack gap={3} align="stretch">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            display="block"
            p={4}
            background={bgGradient}
            color="white"
            textAlign="center"
            borderRadius="lg"
            fontWeight="medium"
            textDecoration="none"
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 16px rgba(255, 107, 157, 0.5)',
            }}
            _active={{
              transform: 'translateY(0)',
            }}
            transition="all 0.2s"
          >
            {link.label} <ExternalLinkIcon mx={2} />
          </Link>
        ))}
      </VStack>
    </VStack>
  );
};

export default RelatedLinks;
