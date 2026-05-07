import { Grid, Text, VStack, HStack, Button, Icon, Flex } from '@chakra-ui/react';
import { Card } from '..';
import { useContext, useMemo, useState, useEffect } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { type Image } from '@/types';
import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { appTheme } from '@/config/theme';

interface PhotoGridProps {
    active: string;
    photos: Image[];
}

const IMAGES_PER_PAGE = 15;

const PhotoGrid: React.FC<PhotoGridProps> = ({ active, photos }) => {
    const { user } = useContext(AuthContext);
    const [currentPage, setCurrentPage] = useState(1);

    const filteredImages = useMemo(() => {
        if (!photos || photos.length === 0) return [];
        if (active === 'Home') {
            return photos;
        }
        return photos.filter((image: Image) => image.user === user);
    }, [photos, active, user]);

    // Reset to page 1 when photos or active tab changes
    useEffect(() => {
        setCurrentPage(1);
    }, [filteredImages.length, active]);

    const totalPages = Math.ceil(filteredImages.length / IMAGES_PER_PAGE);
    
    const paginatedImages = useMemo(() => {
        const startIndex = (currentPage - 1) * IMAGES_PER_PAGE;
        const endIndex = startIndex + IMAGES_PER_PAGE;
        return filteredImages.slice(startIndex, endIndex);
    }, [filteredImages, currentPage]);

    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(1, prev - 1));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(totalPages, prev + 1));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePageClick = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (filteredImages.length === 0) {
        return (
            <VStack w="full" py={12} px={4}>
                <Text fontSize="3xl" mb={2}>
                    📷
                </Text>
                <Text fontSize="xl" fontWeight="bold" textAlign="center">
                    {active === 'Home' ? 'Nessuna foto ancora' : 'Non hai ancora foto'}
                </Text>
                <Text fontSize="md" color="gray.600" textAlign="center" mt={2}>
                    {active === 'Home'
                        ? 'Sii il primo a condividere una foto!'
                        : 'Carica la tua prima foto per vederla qui'}
                </Text>
            </VStack>
        );
    }

    return (
        <VStack w="full" gap={6}>
            <Grid w="full" p={4} gap={4} templateColumns="repeat(2, 1fr)">
                {paginatedImages.map((image: Image) => (
                    <Card key={image._id} photo={image} />
                ))}
            </Grid>
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
                <Flex 
                    w="full" 
                    justify="center" 
                    align="center" 
                    py={8} 
                    gap={4}
                >
                    <Button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        variant="ghost"
                        rounded="full"
                        w={10}
                        h={10}
                        minW={10}
                        p={0}
                        color="gray.600"
                        _hover={{ bg: 'gray.100', color: appTheme.colors.primary }}
                        _disabled={{ opacity: 0.3, cursor: 'not-allowed', _hover: { bg: 'transparent' } }}
                        aria-label="Pagina precedente"
                        transition="all 0.2s"
                    >
                        <Icon as={FiChevronLeft} boxSize={6} />
                    </Button>
                    
                    {/* Page numbers */}
                    <HStack gap={2}>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                            // Show first page, last page, current page, and pages around current
                            const showPage = 
                                page === 1 || 
                                page === totalPages || 
                                Math.abs(page - currentPage) <= 1;
                            
                            // Show ellipsis
                            const showEllipsisBefore = page === currentPage - 2 && currentPage > 3;
                            const showEllipsisAfter = page === currentPage + 2 && currentPage < totalPages - 2;
                            
                            if (showEllipsisBefore || showEllipsisAfter) {
                                return (
                                    <Text key={`ellipsis-${page}`} color="gray.400" fontSize="sm" fontWeight="medium">
                                        ...
                                    </Text>
                                );
                            }
                            
                            if (!showPage) return null;
                            
                            const isActive = currentPage === page;
                            
                            return (
                                <Button
                                    key={page}
                                    onClick={() => handlePageClick(page)}
                                    variant="ghost"
                                    bg={isActive ? appTheme.colors.primary : 'transparent'}
                                    color={isActive ? 'gray.900' : 'gray.600'}
                                    _hover={{ 
                                        bg: isActive ? appTheme.colors.primary : 'gray.100',
                                        transform: isActive ? 'none' : 'translateY(-2px)'
                                    }}
                                    size="sm"
                                    w={10}
                                    h={10}
                                    minW={10}
                                    rounded="full"
                                    fontSize="sm"
                                    fontWeight={isActive ? "bold" : "medium"}
                                    border={isActive ? "1px solid" : "1px solid transparent"}
                                    borderColor={isActive ? "#D9D3CD" : "transparent"}
                                    transition="all 0.2s"
                                >
                                    {page}
                                </Button>
                            );
                        })}
                    </HStack>
                    
                    <Button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        variant="ghost"
                        rounded="full"
                        w={10}
                        h={10}
                        minW={10}
                        p={0}
                        color="gray.600"
                        _hover={{ bg: 'gray.100', color: appTheme.colors.primary }}
                        _disabled={{ opacity: 0.3, cursor: 'not-allowed', _hover: { bg: 'transparent' } }}
                        aria-label="Pagina successiva"
                        transition="all 0.2s"
                    >
                        <Icon as={FiChevronRight} boxSize={6} />
                    </Button>
                </Flex>
            )}
        </VStack>
    );
};

export default React.memo(PhotoGrid);