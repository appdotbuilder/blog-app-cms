import React, { useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    minHeight?: string;
}

export function RichTextEditor({
    value,
    onChange,
    placeholder = 'Start writing your article...',
    className,
    disabled = false,
    minHeight = '300px'
}: RichTextEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const updateContent = useCallback(() => {
        if (editorRef.current) {
            const html = editorRef.current.innerHTML;
            onChange(html);
        }
    }, [onChange]);

    const execCommand = useCallback((command: string, value?: string) => {
        if (disabled) return;
        document.execCommand(command, false, value);
        updateContent();
    }, [disabled, updateContent]);

    const handleImageUpload = useCallback(async (file: File) => {
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch('/api/upload-image', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content || '',
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                const imageHtml = `<img src="${data.url}" alt="${data.name}" style="max-width: 100%; height: auto; margin: 1rem 0;" />`;
                
                // Insert image at cursor position
                const selection = window.getSelection();
                if (selection && selection.rangeCount > 0) {
                    const range = selection.getRangeAt(0);
                    range.deleteContents();
                    const div = document.createElement('div');
                    div.innerHTML = imageHtml;
                    range.insertNode(div.firstChild!);
                    range.collapse(false);
                }
                
                updateContent();
            } else {
                alert('Failed to upload image');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image');
        }
    }, [updateContent]);

    const handleFileInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            handleImageUpload(file);
        }
        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, [handleImageUpload]);

    const handlePaste = useCallback(async (event: React.ClipboardEvent) => {
        const items = event.clipboardData?.items;
        if (!items) return;

        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                event.preventDefault();
                const file = items[i].getAsFile();
                if (file) {
                    await handleImageUpload(file);
                }
                break;
            }
        }
    }, [handleImageUpload]);

    const toolbarButtons = [
        { command: 'bold', icon: 'bold', title: 'Bold (Ctrl+B)' },
        { command: 'italic', icon: 'italic', title: 'Italic (Ctrl+I)' },
        { command: 'underline', icon: 'underline', title: 'Underline (Ctrl+U)' },
        { command: 'strikethrough', icon: 'strikethrough', title: 'Strikethrough' },
        { divider: true },
        { command: 'formatBlock', value: 'h1', icon: 'heading-1', title: 'Heading 1' },
        { command: 'formatBlock', value: 'h2', icon: 'heading-2', title: 'Heading 2' },
        { command: 'formatBlock', value: 'h3', icon: 'heading-3', title: 'Heading 3' },
        { command: 'formatBlock', value: 'p', icon: 'type', title: 'Paragraph' },
        { divider: true },
        { command: 'insertUnorderedList', icon: 'list', title: 'Bullet List' },
        { command: 'insertOrderedList', icon: 'list-ordered', title: 'Numbered List' },
        { command: 'indent', icon: 'indent', title: 'Indent' },
        { command: 'outdent', icon: 'outdent', title: 'Outdent' },
        { divider: true },
        { command: 'justifyLeft', icon: 'align-left', title: 'Align Left' },
        { command: 'justifyCenter', icon: 'align-center', title: 'Align Center' },
        { command: 'justifyRight', icon: 'align-right', title: 'Align Right' },
        { command: 'justifyFull', icon: 'align-justify', title: 'Justify' },
        { divider: true },
        { command: 'createLink', icon: 'link', title: 'Insert Link', needsValue: true },
        { command: 'unlink', icon: 'unlink', title: 'Remove Link' },
        { command: 'insertImage', icon: 'image', title: 'Insert Image', isImageUpload: true },
        { divider: true },
        { command: 'removeFormat', icon: 'remove-formatting', title: 'Clear Formatting' },
        { command: 'undo', icon: 'undo', title: 'Undo (Ctrl+Z)' },
        { command: 'redo', icon: 'redo', title: 'Redo (Ctrl+Y)' },
    ];

    const handleButtonClick = (button: { command?: string; isImageUpload?: boolean; needsValue?: boolean; title?: string; value?: string }) => {
        if (button.isImageUpload) {
            fileInputRef.current?.click();
        } else if (button.needsValue && button.title && button.command) {
            const value = prompt(`Enter ${button.title.toLowerCase()}:`);
            if (value) {
                execCommand(button.command, value);
            }
        } else if (button.command) {
            execCommand(button.command, button.value);
        }
    };

    return (
        <div className={cn('border rounded-lg overflow-hidden', className)}>
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-muted/50">
                {toolbarButtons.map((button, index) => {
                    if (button.divider) {
                        return (
                            <div
                                key={index}
                                className="w-px h-6 bg-border mx-1"
                            />
                        );
                    }

                    return (
                        <Button
                            key={(button.command || 'btn') + index}
                            variant="ghost"
                            size="sm"
                            title={button.title}
                            disabled={disabled}
                            onClick={() => handleButtonClick(button)}
                            className="h-8 w-8 p-0"
                        >
                            <span className="text-xs">{button.icon === 'bold' ? '𝐁' : 
                                button.icon === 'italic' ? '𝐼' : 
                                button.icon === 'underline' ? '𝐔' : 
                                button.icon === 'image' ? '🖼️' : 
                                button.icon === 'link' ? '🔗' : 
                                button.icon === 'list' ? '•' : '⚙️'}</span>
                        </Button>
                    );
                })}
            </div>

            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
            />

            {/* Editor */}
            <div
                ref={editorRef}
                contentEditable={!disabled}
                suppressContentEditableWarning={true}
                className={cn(
                    'p-4 prose prose-sm max-w-none focus:outline-none',
                    'prose-headings:mt-4 prose-headings:mb-2',
                    'prose-p:my-2 prose-img:rounded-lg',
                    'dark:prose-invert',
                    disabled && 'opacity-50 cursor-not-allowed'
                )}
                style={{ minHeight }}
                data-placeholder={placeholder}
                onInput={updateContent}
                onPaste={handlePaste}
                dangerouslySetInnerHTML={{ __html: value }}
            />

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-2 text-xs text-muted-foreground bg-muted/30">
                <div>
                    💡 Tip: You can paste images directly or drag & drop them into the editor
                </div>
                <div>
                    📝 {value.replace(/<[^>]*>/g, '').trim().split(/\s+/).length} words
                </div>
            </div>
        </div>
    );
}