require 'securerandom'

module Jekyll
    class FolderGenerator < Generator
      safe true
      priority :high
      
      def generate_id(name)
        return ("id-" + name + '-' + SecureRandom.hex(8)).gsub(/[^0-9a-z]/i, '')
      end 

      def recursive_subfolders(folder_path, site)
        folder_contents = []
        # Traverse the directory and separate files from folders, ignoring hidden files
        Dir.foreach(File.join(site.source, folder_path)) do |item|
            next if item.start_with?('.')
            item_path = File.join(folder_path, item)
            if File.directory?(File.join(site.source, item_path))
                folder_contents << { 'type' => 'directory', 'name' => item, 'path' => item_path, 'contents' => recursive_subfolders(item_path, site), 'id' => generate_id(item)}
                # get length of subfolder
                folder_contents[-1]['length'] = folder_contents[-1]['contents'].length
                folder_contents[-1]['contains_img'] = folder_contents[-1]['contents'].any? { |item| item['type'] == 'file' }
            elsif File.file?(File.join(site.source, item_path))
                folder_contents << { 'type' => 'file', 'name' => item, 'path' => item_path , 'id' => generate_id(item)}
            end
        end
        folder_contents.sort_by! { |item| [item['type'] == 'directory' ? 0 : 1, item['name']] }
        return folder_contents
        end

  
      def generate(site)
        folder_path = 'Photos'
        folder_contents = recursive_subfolders(folder_path, site)
  
        # Store the data in site.data for access in Liquid templates
        site.data['folder_contents'] = folder_contents
        site.data['length'] = folder_contents.length
      end
    end
  end
  