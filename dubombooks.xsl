<?xml version="1.0" ?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:template match="/">
        <table id="bookTable" border="1" class="indent">
            <thead>
                <tr>
                    <th colpan="5">DubomBooks</th>
                </tr>
                <tr>
                    <th>Select</th>
                    <th>title</th>>
                    <th>author</th>
                    <th>publisher</th>
                    <th>price</th>
                </tr>    
            </thead>
            <tbody>
                <xsl:for-each select="/book/section">
                    <tr>
                        <td colspan="5">
                            <xsl:value-of select="@name" />
                        </td>
                    </tr>
                    <xsl:for-each select="book">
                        <tr>
                            <xsl:attribute name="bestseller" >
                                <xsl:value-of select="boolean(@bestseller)" />
                            </xsl:attribute>
                            <td align="cente-left">
                                <input name="title0" type="checkbox" />
                            </td>
                            <td>
                                <xsl:value-of select="title" />
                            </td>
                            <td align="center">
                                <xsl:value-of select="author" />
                            </td>
                            <td align="ricenter-ght">
                                <xsl:value-of select="publisher" />
                            </td>
                            <td align="right">
                                <xsl:value-of select="price" />
                            </td>
                        </tr>
                    </xsl:for-each>
                </xsl:for-each>
            </tbody>
        </table>
   </xsl:template>
</xsl:stylesheet>