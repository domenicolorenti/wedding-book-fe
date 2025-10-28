import { Grid, Text, VStack, HStack, Button, Icon } from '@chakra-ui/react';
import { Card } from '..';
import { useContext, useMemo, useState, useEffect } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { type Image } from '@/types';
import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

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
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(totalPages, prev + 1));
    };

    const handlePageClick = (page: number) => {
        setCurrentPage(page);
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
                <HStack w="full" justify="center" align="center" pb={6} gap={2}>
                    <Button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        variant="outline"
                        size="sm"
                        aria-label="Pagina precedente"
                        minW="40px"
                    >
                        <Icon as={FiChevronLeft} />
                    </Button>
                    
                    {/* Page numbers */}
                    <HStack gap={1}>
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
                                    <Text key={`ellipsis-${page}`} px={2} color="gray.500">
                                        ...
                                    </Text>
                                );
                            }
                            
                            if (!showPage) return null;
                            
                            return (
                                <Button
                                    key={page}
                                    onClick={() => handlePageClick(page)}
                                    variant={currentPage === page ? 'solid' : 'ghost'}
                                    colorScheme={currentPage === page ? 'orange' : 'gray'}
                                    size="sm"
                                    minW="40px"
                                >
                                    {page}
                                </Button>
                            );
                        })}
                    </HStack>
                    
                    <Button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        variant="outline"
                        size="sm"
                        aria-label="Pagina successiva"
                        minW="40px"
                    >
                        <Icon as={FiChevronRight} />
                    </Button>
                </HStack>
            )}
        </VStack>
    );
};

export default React.memo(PhotoGrid);