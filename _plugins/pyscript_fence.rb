# frozen_string_literal: true

require "cgi"

module Jekyll
  module PyScriptFence
    # Replace:
    #   <pre><code class="language-pyscript">...</code></pre>
    # with:
    #   <script type="py" terminal worker>...</script>
    #
    # Notes:
    # - This runs after Markdown is rendered, so we operate on HTML.
    # - We unescape entities because code blocks are HTML-escaped.
    def self.transform(html)
      html.gsub(
        %r{<pre><code class="language-pyscript">(.+?)</code></pre>}m
      ) do
        code_escaped = Regexp.last_match(1)
        code = CGI.unescapeHTML(code_escaped)

        # Avoid closing-script injection edge-case
        code = code.gsub("</script>", "<\\/script>")

        %(<script type="py" terminal worker>\n#{code}\n</script>)
      end
    end
  end
end

Jekyll::Hooks.register [:documents, :pages], :post_render do |doc|
  next unless doc.output_ext == ".html"
  doc.output = Jekyll::PyScriptFence.transform(doc.output)
end
