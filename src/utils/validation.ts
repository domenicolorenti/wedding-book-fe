/**
 * Validates and sanitizes username input
 */
export const validateUsername = (username: string): { valid: boolean; error?: string } => {
  const trimmed = username.trim();

  if (!trimmed) {
    return { valid: false, error: 'Inserisci il nome per continuare' };
  }

  if (trimmed.length < 2) {
    return { valid: false, error: 'Il nome deve essere almeno 2 caratteri' };
  }

  if (trimmed.length > 50) {
    return { valid: false, error: 'Il nome non può superare 50 caratteri' };
  }

  // Only allow letters, numbers, spaces, and common accented characters
  const validNamePattern = /^[a-zA-Z0-9àèéìòùÀÈÉÌÒÙáéíóúÁÉÍÓÚäëïöüÄËÏÖÜ\s'-]+$/;
  if (!validNamePattern.test(trimmed)) {
    return { valid: false, error: 'Il nome contiene caratteri non validi' };
  }

  return { valid: true };
};

/**
 * Sanitizes username by trimming and converting to lowercase
 */
export const sanitizeUsername = (username: string): string => {
  return username.trim().toLowerCase();
};

/**
 * Validates image file
 */
export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
  const maxSize = 30 * 1024 * 1024; // 30MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic'];

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Formato immagine non supportato. Usa JPG, PNG o WEBP' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'Immagine troppo grande. Massimo 30MB' };
  }

  return { valid: true };
};
