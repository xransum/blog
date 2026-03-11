#!/usr/bin/env ruby
#
# Fetches all-time PyPI download counts at build time for projects that have
# a `pypi_package` field in _data/projects.yml.
#
# Uses the pepy.tech badge SVG as the data source — it pulls from the BigQuery
# dataset that backs the official PyPI download stats, so it matches what the
# badge on the repo shows.
#
# Injects `pypi_downloads` (String, e.g. "14k") back onto each matching data
# hash so templates can render it statically — no client-side fetch required.

require 'net/http'
require 'uri'

Jekyll::Hooks.register :site, :pre_render do |site|
  projects = site.data.dig('projects')
  next unless projects.is_a?(Array)

  projects.each do |project|
    pkg = project['pypi_package']
    next unless pkg

    begin
      uri = URI("https://static.pepy.tech/badge/#{pkg}")
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true
      http.open_timeout = 5
      http.read_timeout = 10

      request = Net::HTTP::Get.new(uri)
      response = http.request(request)

      if response.is_a?(Net::HTTPSuccess)
        # The SVG contains pairs of shadow/foreground text nodes; the download
        # count is the last distinct value — grab all textLength content and
        # take the final unique entry.
        matches = response.body.scan(/textLength="\d+">([^<]+)<\/text>/).flatten.uniq
        count = matches.last
        if count && count != 'downloads'
          project['pypi_downloads'] = count
          Jekyll.logger.info "PyPI:", "#{pkg} — #{count} total downloads"
        end
      else
        Jekyll.logger.warn "PyPI:", "#{pkg} returned HTTP #{response.code}, skipping"
      end
    rescue => e
      Jekyll.logger.warn "PyPI:", "#{pkg} fetch failed (#{e.message}), skipping"
    end
  end
end
